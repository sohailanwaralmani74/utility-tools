---
layout: post
title: Kafka Highlights | Comprehensive Guide To Kafka Ecosystem
author: sohail
date: 2025-04-10 23:10:00 +0800
categories: [Programming, AI]
img: kafka.png
---

> The document contains vital information about Kafka ecosystem navigation with essential commands and best practices. The reference provides essential information about Kafka through its brief yet thorough content for anyone interested in Kafka.

<h2>Introduction</h2>

Apache Kafka is a powerful distributed streaming platform that has become a cornerstone for modern data processing and real-time event streaming architectures. Originally developed by LinkedIn, Kafka is now an open-source project under the Apache Software Foundation. Its robust design allows for reliable data stream processing, high throughput, low latency, and fault tolerance in both storage and publishing operations. 

Kafka is essentially a distributed event streaming system that handles vast amounts of information while providing durable, scalable, and fault-tolerant functionality. It is widely used for building real-time data pipelines, monitoring systems, log aggregation, and various other solutions. The system utilizes a publish-subscribe model, enabling data producers (or publishers) to send records to topics, which are then accessible by data consumers (or subscribers).

To simplify the use of Kafka, a cheatsheet is available that provides easy access to essential Kafka concepts, components, and command usages. This resource is invaluable for developers, data engineers, and operations professionals, giving them the tools needed to understand Kafka's structure, manage clusters, and execute standard operations efficiently. It includes vital information on handling topics, producers, and consumers, all presented in a user-friendly format.

In the following sections, we’ll explore how Apache Kafka facilitates real-time data streaming for project implementation and application deployment. This exploration will shed light on Kafka’s role in enhancing data workflows and enabling seamless integration across various systems.

<h2> Installing Apache Kafka </h2>

Follow these instructions to install Apache Kafka on your local machine while starting its operation. We will establish an elementary configuration for development and testing needs.

<h3>Prerequisites</h3>

Install Java on your local machine as Kafka is Java based application. If you already have installed java then it is good go. Just Varify Java installation.

    java -v

> install git bash if you are working on Windows OS.
<h3>Download Apache Kafka</h3>

Visit official website for apache Kafka and download [Apache Kafka](https://kafka.apache.org/downloads) .Download zip archive and extract on your desired location.

> Download as per your OS requirement(eg: WIndows, Linux, Mac etc).

<h3>Start Kafka Broker </h3>

Go to your kafka installation .

The application needs ZooKeeper distributed coordination services through Apache ZooKeeper. So we must need to start zookeeper service before starting Kafka server.

    sudo sh ./bin/zookeeper-server-start.sh config/zookeeper.properties

It must be running, open new terminal and run Kafka now

    sudo sh ./bin//kafka-server-start.sh config/server.properties

If there is no error while executing commands above we are good to go to create new topic.

<h4>What Is Kafka Topic And How To Create One? </h4>

A Kafka Topic is a categorized stream of data (like a folder or channel) in Apache Kafka where messages are stored and organized. Topics are split into partitions to enable parallel processing, scalability, and fault tolerance. Producers write data on topics, and consumers read from them. Each message in a topic is stored with a unique offset and retained for a configurable period. Topics support distributed, real-time data streaming. Below is the Command to create a Topic in Kafka.

> We will discus each parameter used in command below

    sudo sh ./bin/kafka-topics.sh --create --topic new-topic --bootstrap -server localhost:9090 --replication -factor 1 --partitions 1

- --create          : Initiates the creation of a new Kafka topic.  
- --topic           : Specifies the name of the topic (e.g., "new-topic").  
- --bootstrap-server: Defines the Kafka broker address (e.g., "localhost:9090").  
- --replication-factor: Sets the number of copies of the topic across brokers (1 = no replication).  
- --partitions      : Determines the number of partitions for parallel processing (1 = single partition).  

If all is good then we can proceed further, You have successfully created your first topic and Kafka up and running on your local machine. Get started now! Produce and consume messages, create topics, and unlock Kafka's powerful event streaming and real-time data processing features.


<h3>Components Of Apache Kafka</h3>

<h2>Apache Kafka Core Components</h2>
<p>Apache Kafka's distributed event streaming platform is built on three fundamental components that work together to handle real-time data at scale:</p>

<table border="1" style="width:100%; border-collapse: collapse;">
  <tr style="background-color: #f2f2f2;">
    <th style="padding: 8px; text-align: left;">Component</th>
    <th style="padding: 8px; text-align: left;">Description</th>
  </tr>
  <tr>
    <td style="padding: 8px;"><strong>Publish/Subscribe</strong></td>
    <td style="padding: 8px;">The core messaging system that enables distributed, high-throughput event streaming with scalability, durability, and fault tolerance.</td>
  </tr>
  <tr>
    <td style="padding: 8px;"><strong>Kafka Connect</strong></td>
    <td style="padding: 8px;">Framework for reliable integration between Kafka brokers and external systems (data sources/sinks).</td>
  </tr>
  <tr>
    <td style="padding: 8px;"><strong>Kafka Streams</strong></td>
    <td style="padding: 8px;">Client library for real-time event processing and stream transformations.</td>
  </tr>
</table>

Apache Kafka operates in a distributed cluster architecture, where each node in the cluster is known as a Broker. Kafka Connect plays a vital role by enabling seamless integration between Brokers and external clients that produce or consume event data. This integration supports Kafka's publish/subscribe messaging system, allowing for the instantaneous exchange of event data across servers, processes, and applications.

When data needs to be processed in real-time, the Kafka Streams component can be employed. This feature facilitates real-time event processing, enabling applications to react and respond to changes as they occur. By leveraging these components, Kafka ensures efficient and reliable handling of event data across diverse environments.

<h3>The Publish / Subscribe Model</h3>

The publish/subscribe mechanism handles the distributed streaming of large-scale data in a way that is massively scalable, reliably durable, and fully fault-tolerant. The primary components of this system are:

<table border ="1" style="width:100%; border-collapse: collapse; color:black;">
  <tr style="background-color: #f2f2f2;">
    <th style="padding: 8px; text-align: left; width:160px;">Concept</th>
    <th style="padding: 8px; text-align: left;">Description</th>
  </tr>
  <tr>
    <td style="padding: 8px;"><strong>Broker</strong></td>
    <td style="padding: 8px;">This server maintains data storage as well as data management operations. Producers submit their messages to brokers which consumers fetch from the same brokers. A Kafka cluster implements a system of several brokers to provide data protection and maintain expanded computational capabilities.</td>
  </tr>
  <tr>
    <td style="padding: 8px;"><strong>Topic</strong></td>
    <td style="padding: 8px;">A logical channel or category for data in Kafka. Topics serve as classification tools in Kafka that let producers distribute data and consumers choose particular topics for subscription. Each topic holds several partitions to achieve data processing parallelism.</td>
  </tr>
  <tr>
    <td style="padding: 8px;"><strong>Partition</strong></td>
    <td style="padding: 8px;">Partition is machanism to distribute data horinetaly within the topic. Partitions allow Kafka to achieve high throughput by distributing data across multiple brokers and enabling parallelism for consumers. Furthermore Each partition is an ordered, immutable sequence of messages.</td>
  </tr>
  <tr>
    <td style="padding: 8px;"><strong>Offset</strong></td>
    <td style="padding: 8px;">A distinct, incremental number assigned to each message in a topic partition, ensuring proper ordering.</td>
  </tr>
  <tr>
    <td style="padding: 8px;"><strong>Message (Record)</strong></td>
    <td style="padding: 8px;">A record is a structured message with a key, value, timestamp, and optional headers, transferred between producers and consumers in ordered partitions.</td>
  </tr>
  <tr>
    <td style="padding: 8px;"><strong>Producer</strong></td>
    <td style="padding: 8px;">The Kafka producer serves as a component to transmit messages to Kafka topics. Producers need to decide one or multiple topics for their data publications and must indicate both topic and partition when sending messages.</td>
  </tr>
  <tr>
    <td style="padding: 8px;"><strong>Consumer</strong></td>
    <td style="padding: 8px;">A Kafka consumer is a component that subscribes to one or more topics and reads messages from Kafka. It can use different APIs (high-level for ease, low-level for control) and operate alone or in groups to balance workloads efficiently.</td>
  </tr>
  <tr>
    <td style="padding: 8px;"><strong>Consumer Group</strong></td>
    <td style="padding: 8px;">A logical set of consumers that team up to read data from Kafka topics. Each partition in a topic is assigned to only one consumer in the group, enabling parallel processing and fault tolerance. If a consumer fails, the group automatically redistributes its work to others.</td>
  </tr>
  <tr>
    <td style="padding: 8px;"><strong>KRaft</strong></td>
    <td style="padding: 8px;">The new self-managed consensus protocol in Kafka (introduced in version 2.8.0+) that replaces ZooKeeper. It uses the Raft algorithm to handle cluster metadata (like broker coordination, topic configurations, and leader elections) in a distributed, fault-tolerant way. In Previous version it was managed by Zookeeper.</td>
  </tr>
  <tr>
    <td style="padding: 8px;"><strong>Producer API</strong></td>
    <td style="padding: 8px;">A client library that enables applications to send messages (records) to Kafka topics. It handles partitioning, retries, batching, and serialization, ensuring reliable, high-throughput data delivery even during failures.</td>
  </tr>
  <tr>
    <td style="padding: 8px;"><strong>Consumer API</strong></td>
    <td style="padding: 8px;">A client library allowing applications to read messages from Kafka topics. It manages partition assignment, offset tracking, and group coordination (for consumer groups), enabling scalable, fault-tolerant message processing with configurable parallelism and delivery guarantees.</td>
  </tr>
</table>

<h3>How To Create Kafka Producer And Consumer In Java</h3>

Below is a Java code snippet that demonstrates how to create a Kafka producer and send a "The First Message" message to the new-topic topic, We created earlier.

    import org.apache.kafka.clients.producer.*;
    import java.util.Properties;

    public class KafkaProducerExample {
        public static void main(String[] args) {
        // Configure producer properties
        Properties props = new Properties();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092"); // Kafka broker address
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, 
                "org.apache.kafka.common.serialization.StringSerializer");
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, 
                "org.apache.kafka.common.serialization.StringSerializer");
        
        // Recommended reliability configurations
        props.put(ProducerConfig.ACKS_CONFIG, "all"); // Ensure full commit acknowledgment
        props.put(ProducerConfig.RETRIES_CONFIG, 3); // Retry on transient failures
        props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true); // Exactly-once semantics

        try (Producer<String, String> producer = new KafkaProducer<>(props)) {
            String topic = "new-topic";
            String key = "testKey";
            String value = "The First Message";

            // Create a producer record with key
            ProducerRecord<String, String> record = new ProducerRecord<>(topic, key, value);

            // Send message with callback
            producer.send(record, (metadata, exception) -> {
                if (exception == null) {
                    System.out.printf("Successfully sent message to:\n" +
                                       "Topic: %s\nPartition: %d\nOffset: %d\n",
                                       metadata.topic(), 
                                       metadata.partition(), 
                                       metadata.offset());
                } else {
                    System.err.printf("Failed to send message: %s%n", 
                                    exception.getMessage());
                }
            });

            // Flush any remaining messages and close (auto-closed by try-with-resources)
            producer.flush();
        } catch (Exception e) {
            System.err.println("Fatal producer error: " + e.getMessage());
        }
    }
}


- <b>StringSerializer</b> - Converts message keys/values from strings to bytes for Kafka.
- <b>Bootstrap Servers</b> - Kafka broker addresses (e.g., localhost:9092) to connect to.
- <b>Acks=all </b> - Waits for all replicas to confirm writes to avoid data loss.
- <b>Retries=3 </b>- Retries failed sends automatically (e.g., network issues).
- <b>Idempotence </b>- Ensures no duplicate messages even after retries.
- <b>ProducerRecord </b>- Holds the topic, key, and value of a message to send.
- <b>Callback </b>- Notifies if a message succeeds or fails to send.
- <b>Try-with-resources </b>- Auto-closes the producer to free resources.
- <b>Flush </b>- Forces buffered messages to send immediately.

#### Additional Recommendations

- Consider using a logger instead of System.out
- Add configuration validation
- Make properties configurable via external file
- Add shutdown hook for graceful termination
- Consider async send with Future.get() for synchronous needs

We are done with creating producer to send message to new-topic. Now its turn to create consumer that will subscribe new-topic to recieve message / record.

    import org.apache.kafka.clients.consumer.*;
    import org.apache.kafka.common.serialization.StringDeserializer;
    import java.time.Duration;
    import java.util.Collections;
    import java.util.Properties;

    public class KafkaConsumerExample {
        private static final String TOPIC = "new-topic";
        private static final String GROUP_ID = "enhanced-consumer-group";
        private static final String BOOTSTRAP_SERVERS = "localhost:9092";
        private static final Duration POLL_DURATION = Duration.ofMillis(100);

        public static void main(String[] args) {
         // Configure consumer properties
            Properties props = new Properties();
            props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAP_SERVERS);
            props.put(ConsumerConfig.GROUP_ID_CONFIG, GROUP_ID);
            props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
            props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
            props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest"); // Start from beginning if no offset
            props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, "false"); // Manual offset commits
            props.put(ConsumerConfig.ISOLATION_LEVEL_CONFIG, "read_committed"); // Read only committed messages

            try (KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props)) {
                consumer.subscribe(Collections.singletonList(TOPIC));
            
             // Add shutdown hook for graceful exit
                 Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                 System.out.println("Shutting down consumer...");
                consumer.wakeup();
            }));

                while (true) {
                 try {
                    ConsumerRecords<String, String> records = consumer.poll(POLL_DURATION);
                    
                    if (records.isEmpty()) continue;
                    
                    for (ConsumerRecord<String, String> record : records) {
                        System.out.printf("\nReceived message:\nTopic: %s\nPartition: %d\nOffset: %d\nKey: %s\nValue: %s\n",
                                record.topic(), record.partition(), record.offset(),
                                record.key(), record.value());
                    }
                    
                    // Manual commit after batch processing
                    consumer.commitSync();
                    
                } catch (WakeupException e) {
                    // Ignore for shutdown
                } catch (Exception e) {
                    System.err.printf("Error processing messages: %s%n", e.getMessage());
                }
            }
        }
    }
}

- <b>Constant Config </b>- Centralized settings (topic, group ID) for easy updates.
- <b>Try-with-Resources</b> - Auto-closes consumer to prevent resource leaks.
- <b>Graceful Shutdown </b>- Cleanly exits on termination via shutdown hook.
- <b>Manual Commits </b>- Offsets committed after processing to avoid data loss.
- <b>Read Committed </b>- Only processes transactions confirmed by producers.
- <b>Structured Logging </b>- Formatted output for clear message details.
- <b>Error Handling </b>- Catches exceptions without crashing the loop.
- <b>No Auto-Commit</b> - Disables risky automatic offset commits.
- <b>Empty Poll Check </b>- Skips empty batches for efficiency.
- <b>WakeupException </b>- Safely breaks polling loop during shutdown.

#### Additional Recommendations:

- Add message batch processing logic
- Implement async commit strategy
- Add metrics/reporting
- Handle rebalance events with ConsumerRebalanceListener
- Add config validation


This code configures a Kafka consumer to connect to a broker, subscribe to a topic ("test-topic"), and continuously check for new messages. Messages are always delivered in the order they were written (offset order), ensuring predictable processing. To avoid reprocessing the same messages after a restart, the consumer tracks its progress by saving the "offset" (a pointer to the last-read message). This can be done automatically (by enabling  `enable.auto.commit=true`) or manually (using  `commitSync()`  after processing, as shown here).

Messages stay on the broker until Kafka’s retention rules delete them—not when they’re consumed. Retention is controlled by two settings:

-   **`log.retention.bytes`**: Maximum data size a partition can hold.
    
-   **`log.retention.hours`**: How long (in hours) messages are kept.
    

This setup balances reliability (manual commits) with Kafka’s built-in durability (retention policies).

<h3>Kafka Connect Framework</h3>

Kafka Connect is a framework within Apache Kafka that facilitates streaming data between Kafka and external systems, like databases and file systems. It uses connectors to move data, allowing for flexible, scalable, and real-time data pipelines. 