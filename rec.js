import amqp from "amqplib/callback_api.js"

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        let queue = 'task_queue';

        channel.assertQueue(queue, {
            durable: true
        });
        channel.prefetch(1);

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            let secs = msg.content.toString().split('.').length - 1;
            console.log("Wait The Response...");
            setTimeout(() => {
                console.log(" [x] The Response is " + msg.content * 2);
                console.log(" [x] Done");
            }, 5000)
        }, {
            noAck: false
        });
    });
});