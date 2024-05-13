import { Injectable, OnApplicationShutdown,  OnModuleInit } from '@nestjs/common'
import { Kafka, Producer, ProducerRecord } from 'kafkajs'

//publish meesaage / write message in a topic..
@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
    async onApplicationShutdown() {
        await this.producer.disconnect()
    }
    async onModuleInit() {
        await this.producer.connect()
    }

    private readonly kafka = new Kafka({
        brokers: [process.env.KAFKA_BROKERS],
    })

    private readonly producer: Producer = this.kafka.producer()

    async produce(record: ProducerRecord) {
        await this.producer.send(record)
    }
}