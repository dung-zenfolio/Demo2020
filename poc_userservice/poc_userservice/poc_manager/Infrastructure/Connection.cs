using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Text;

namespace poc_manager.Infrastructure
{
    public class Connection
    {
        private IConnection _connection;

        public void OpenConnection()
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            _connection = factory.CreateConnection();
        }

        public void CreateQueue()
        {
            using (var channel = _connection.CreateModel())
            {
                channel.QueueDeclare(queue:"User",
                    durable: false,
                    exclusive: false,
                    autoDelete: false,
                    arguments: null
                    );
            }
        }

        public void Publish(string message)
        {
            var body = Encoding.UTF8.GetBytes(message);

        }
    }
}
