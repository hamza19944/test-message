import amqp from "amqplib/callback_api.js"

amqp.connect("amqp://localhost", function(error, connection){
    if(error){
        throw error;
    }
    connection.createChannel((error1, channel)=>{
        if(error1){
            throw error1;
        }
        let queue = "task_queue";
        let mesg = process.argv.slice(2).join(' ') || "22";

        channel.assertQueue(queue, {
            durable: true
        })

        channel.sendToQueue(queue, Buffer.from(mesg), {
            persistent: true
        })

        console.log(" [x] sent %s", mesg);
    })
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
})