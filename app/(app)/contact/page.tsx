"use client";

import React from "react";
import {
  Container,
  Paper,
  TextInput,
  Textarea,
  Button,
  Group,
  Text,
  Card,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNotifications } from "../hooks/useNotifications";
import PageHeader from "../components/common/PageHeader";

interface SimpleContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactPage() {
  const { showSuccess } = useNotifications();

  const form = useForm<SimpleContactFormData>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
    validate: {
      firstName: (value) => (value ? null : "First name is required"),
      lastName: (value) => (value ? null : "Last name is required"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) => (value ? null : "Phone number is required"),
      message: (value) => (value ? null : "Please tell us how we can help you"),
    },
  });

  const handleSubmit = (values: SimpleContactFormData) => {
    console.log("Contact form submitted:", values);
    showSuccess(
      "Success",
      "Your message has been sent! We'll get back to you soon."
    );
    form.reset();
  };

  return (
    <>
      <PageHeader
        title="Contact Me"
        subtitle="Have questions about our services? We'd love to hear from you."
      />

      <Container size="md" pb={80}>
        <Paper p="xl" radius="md" shadow="sm">
          <Stack gap="lg">
            <Text size="xl" fw={600} ta="center" c="gray.8">
              Send Me Your Questions
            </Text>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="md">
                <Group grow>
                  <TextInput
                    label="First Name"
                    placeholder="First"
                    {...form.getInputProps("firstName")}
                    required
                  />
                  <TextInput
                    label="Last Name"
                    placeholder="Last"
                    {...form.getInputProps("lastName")}
                    required
                  />
                </Group>

                <TextInput
                  label="Email"
                  placeholder="your.email@example.com"
                  {...form.getInputProps("email")}
                  required
                />

                <TextInput
                  label="Phone"
                  placeholder="Your phone number"
                  {...form.getInputProps("phone")}
                  required
                />

                <Textarea
                  label="How can we assist you?"
                  placeholder="Please describe your needs or any questions you have..."
                  minRows={4}
                  {...form.getInputProps("message")}
                  required
                />

                <Group justify="center" mt="lg">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-green-900 hover:bg-green-800 text-white"
                    px={50}
                  >
                    SUBMIT
                  </Button>
                </Group>
              </Stack>
            </form>
          </Stack>
        </Paper>

        {/* Contact Information */}
        <Card shadow="sm" p="xl" radius="md" mt={64} bg="gray.0">
          <Text size="xl" fw={600} ta="center" mb="md" c="gray.8">
            Get in Touch
          </Text>
          <Stack gap="sm" align="center">
            <Text c="gray.7">📧 info@blupidogtraining.com</Text>
            <Text c="gray.7">📱 +44 7123 456 789</Text>
            <Text c="gray.7">📍 Serving areas around London</Text>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
