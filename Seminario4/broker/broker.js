const zmq = require('zeromq/v5-compat');
const clients_socket = zmq.socket('router');
const workers_socket = zmq.socket('router');

const association_client_worker = new Map();
const association_worker_client = new Map();
const clients_waiting_for_cart_creation_with_a_job = [];
const available_workers = [];

clients_socket.bind('tcp://*:8000');
workers_socket.bind('tcp://*:8001');

clients_socket.on('message', (client_id, del, data) => {
    const parsed_client_id = JSON.stringify(client_id.toJSON());
    const parsed_data = JSON.parse(data);
    if (association_client_worker.has(parsed_client_id)) {
        const worker_associated = association_client_worker.get(parsed_client_id);
        workers_socket.send(
            [
                worker_associated,
                del,
                JSON.stringify({
                    client_id: parsed_client_id,
                    message: parsed_data.message
                })
            ]
        );
    } else {
        const job = {
            client_id: parsed_client_id,
            message: parsed_data.message
        };
        if (available_workers.length > 0) {
            const worker_id = available_workers.shift()
            association_client_worker.set(job.client_id, worker_id);
            workers_socket.send([worker_id, del, JSON.stringify(job)]);
        } else {
            clients_waiting_for_cart_creation_with_a_job.push(job);
        }
    }
});

workers_socket.on('message', (worker_id, del, data) => {
    const parsed_worker_id = JSON.stringify(worker_id.toJSON());
    const parsed_data = JSON.parse(data);
    console.log('Something received', parsed_data)
    if (parsed_data.type === 'new_cart') {
        if (clients_waiting_for_cart_creation_with_a_job.length > 0) {
            const job = clients_waiting_for_cart_creation_with_a_job.shift();
            association_client_worker.set(job.client_id, worker_id);
            workers_socket.send([worker_id, del, JSON.stringify(job)]);
        } else {
            available_workers.push(worker_id);
        }
    } else if (parsed_data.type === 'response') {
        clients_socket.send([Buffer.from(JSON.parse(parsed_data.client_id)), del, JSON.stringify({ message: parsed_data.message })]);
    } else if (parsed_data.type === 'finish_cart') {
        association_client_worker.delete(parsed_data.client_id);
        available_workers.push(worker_id);
        clients_socket.send([Buffer.from(JSON.parse(parsed_data.client_id)), del, JSON.stringify({ message: parsed_data.message })]);
    }
    console.log('client->worker', association_client_worker);
    console.log(available_workers);
});
