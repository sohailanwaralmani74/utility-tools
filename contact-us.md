---
layout: main
title: Online Utility Tools For Small Tasks
description: Converter and metadata scrubber, Along with png to jpeg, wav to mp3, Recet Image & Much more;
---
 <title>Contact Us</title>
<style>
 input, textarea, button {
            width: 100%;
            padding: 10px;
            margin-top: 8px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 14px;
        }
        textarea {
            resize: vertical;
            min-height: 120px;
        }
        button {
            background: #007bff;
            color: white;
            border: none;
            font-size: 16px;
            cursor: pointer;
            margin-top: 15px;
        }
        button:hover {
            background: #0056b3;
        }
        .note {
            text-align: center;
            font-size: 14px;
            color: #777;
            margin-top: 10px;
        }
    </style>
<div class="container">
    <h1>Contact Us</h1>
    <form id="contactForm">
        <label for="name">Your Name</label>
        <input type="text" id="name" name="name" placeholder="Enter your name" required>
        <label for="email">Your Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" required>
        <label for="message">Your Message</label>
        <textarea id="message" name="message" placeholder="Type your message here..." required></textarea>
        <button type="submit">Send Message</button>
    </form>
    <p class="note">We’ll get back to you as soon as possible.</p>
</div>

<script>
    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Form submitted! You can now integrate this with your email sending logic.");
    });
</script>

