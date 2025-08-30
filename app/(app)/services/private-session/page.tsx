"use client";

import React from "react";
import {
  Container,
  Paper,
  TextInput,
  Textarea,
  Button,
  Grid,
  GridCol,
  Group,
  Text,
  Stack,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNotifications } from "../../hooks/useNotifications";
import PageHeader from "../../components/common/PageHeader";

interface PrivateSessionFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export default function PrivateSessionPage() {
  const { showSuccess } = useNotifications();

  const form = useForm<PrivateSessionFormData>({
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
      message: (value) => (value ? null : "Please tell us how we can assist you"),
    },
  });

  const handleSubmit = (values: PrivateSessionFormData) => {
    console.log("Private session inquiry:", values);
    showSuccess("Your inquiry has been submitted! We'll get back to you soon.");
    form.reset();
  };

  return (
    <>
      <PageHeader
        title="Private 1-2-1 session"
        subtitle="Don't let minor concerns escalate into expensive issues. We're here for your pet as much as you need us to be, so your best friends can live their longest, healthiest lives."
      />

      <Container size="md" pb={80}>
        <Stack gap="xl">
          {/* Who is this session for section */}
          <Paper p="xl" radius="md" bg="gray.0">
            <Stack gap="lg">
              <Title order={2} ta="center" c="gray.8">
                Who is this session for?
              </Title>
              <Grid>
                <GridCol span={{ base: 12, md: 4 }}>
                  <Text ta="center" size="sm" c="gray.7">
                    New puppy owners needing guidance
                  </Text>
                </GridCol>
                <GridCol span={{ base: 12, md: 4 }}>
                  <Text ta="center" size="sm" c="gray.7">
                    Dogs with specific behavioral issues
                  </Text>
                </GridCol>
                <GridCol span={{ base: 12, md: 4 }}>
                  <Text ta="center" size="sm" c="gray.7">
                    Owners wanting personalized training
                  </Text>
                </GridCol>
              </Grid>
            </Stack>
          </Paper>

          {/* How many sessions section */}
          <Paper p="xl" radius="md" bg="gray.0">
            <Stack gap="lg">
              <Title order={2} ta="center" c="gray.8">
                How many sessions?
              </Title>
              <Grid>
                <GridCol span={{ base: 12, md: 6 }}>
                  <Text ta="center" size="sm" c="gray.7">
                    Single session assessments available
                  </Text>
                </GridCol>
                <GridCol span={{ base: 12, md: 6 }}>
                  <Text ta="center" size="sm" c="gray.7">
                    Multi-session packages for ongoing support
                  </Text>
                </GridCol>
              </Grid>
            </Stack>
          </Paper>

          {/* Contact Form */}
          <Paper p="xl" radius="md" shadow="sm">
            <Stack gap="lg">
              <Title order={2} ta="center" c="gray.8">
                Send Me Your Questions
              </Title>

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
                    label="How can we assist you and your pet?"
                    placeholder="Please describe your training needs, your pet's behavior, or any specific concerns you have..."
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
        </Stack>
      </Container>
    </>
  );
}