import React from "react";
import {
  Container,
  Paper,
  TextInput,
  Textarea,
  Button,
  Grid,
  Group,
  Text,
  Card,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { type ContactFormData } from "../types";
import { useNotifications } from "../hooks/useNotifications";
import PageHeader from "../components/common/PageHeader";

const Contact: React.FC = () => {
  const { showSuccess } = useNotifications();
  
  const form = useForm<ContactFormData>({
    initialValues: {
      firstName: "",
      lastName: "",
      volunteerNumber: "",
      email: "",
      phone: "",
      dogName: "",
      dogBreed: "",
      healthCheck: "",
      behaviorIssues: "",
      developmentBehaviors: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      firstName: (value) =>
        value && value.length > 0 ? null : "First name is required",
      lastName: (value) => (value && value.length > 0 ? null : "Last name is required"),
      dogName: (value) => (value && value.length > 0 ? null : "Dog name is required"),
      dogBreed: (value) => (value && value.length > 0 ? null : "Dog breed is required"),
      healthCheck: (value) =>
        value && value.length > 0 ? null : "This field is required",
      behaviorIssues: (value) =>
        value && value.length > 0 ? null : "This field is required",
      developmentBehaviors: (value) =>
        value && value.length > 0 ? null : "This field is required",
    },
  });

  const handleSubmit = (values: ContactFormData) => {
    console.log("Contact form submitted:", values);

    showSuccess(
      "Message sent!",
      "Thank you for your message! We'll get back to you soon."
    );

    form.reset();
  };

  return (
    <>
      <PageHeader 
        title="Contact Me" 
        subtitle="Have questions about our services? We'd love to hear from you."
      />
      
      <Container size="lg" pb={80}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="xl">
            {/* Volunteer Details Section */}
            <Paper shadow="md" p="xl" radius="md">
              <Text size="xl" fw={600} mb="lg" c="gray.8">
                Volunteer Details
              </Text>

              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="First Name"
                    placeholder="Enter your first name"
                    withAsterisk
                    {...form.getInputProps("firstName")}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Last Name"
                    placeholder="Enter your last name"
                    withAsterisk
                    {...form.getInputProps("lastName")}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <TextInput
                    label="Volunteer Number"
                    placeholder="Enter your volunteer number"
                    withAsterisk
                    {...form.getInputProps("volunteerNumber")}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <TextInput
                    label="Email"
                    placeholder="Enter your email address"
                    withAsterisk
                    {...form.getInputProps("email")}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <TextInput
                    label="Phone"
                    placeholder="Enter your phone number"
                    {...form.getInputProps("phone")}
                  />
                </Grid.Col>
              </Grid>
            </Paper>

            {/* About Your Dog Section */}
            <Paper shadow="md" p="xl" radius="md">
              <Text size="xl" fw={600} mb="lg" c="gray.8">
                About Your Dog
              </Text>

              <Stack gap="md">
                <TextInput
                  label="Name of Dog"
                  placeholder="Enter your dog's name"
                  withAsterisk
                  {...form.getInputProps("dogName")}
                />

                <TextInput
                  label="Breed"
                  placeholder="Enter your dog's breed"
                  withAsterisk
                  {...form.getInputProps("dogBreed")}
                />

                <Textarea
                  label="Has your dog been to the vet in the past 12 months for any reason other than a routine annual check up? If so, please give details."
                  placeholder="Please provide details about vet visits..."
                  minRows={4}
                  withAsterisk
                  {...form.getInputProps("healthCheck")}
                />

                <Textarea
                  label="Has your dog shown any unpredictable behaviour? If so, please give details."
                  placeholder="Please describe any unpredictable behaviors..."
                  minRows={4}
                  withAsterisk
                  {...form.getInputProps("behaviorIssues")}
                />

                <Textarea
                  label="Has your dog shown any developmental behaviours, this could include but not limited to: excessive licking, grooming, stretching, jumping up, perhaps? If so, please give details."
                  placeholder="Please describe any developmental behaviors..."
                  minRows={4}
                  withAsterisk
                  {...form.getInputProps("developmentBehaviors")}
                />
              </Stack>
            </Paper>

            {/* Submit Button */}
            <Group justify="center">
              <Button type="submit" size="lg" color="primary" radius="md">
                Submit Message
              </Button>
            </Group>
          </Stack>
        </form>

        {/* Contact Information */}
        <Card shadow="sm" p="xl" radius="md" mt={64} bg="gray.0">
          <Text size="xl" fw={600} ta="center" mb="md" c="gray.8">
            Get in Touch
          </Text>
          <Stack gap="sm" align="center">
            <Text c="gray.7">📧 info@blupidogtraining.com</Text>
            <Text c="gray.7">📱 +44 7123 456 789</Text>
            <Text c="gray.7">📍 Serving areas around Buckinghamshire</Text>
          </Stack>
        </Card>
      </Container>
    </>
  );
};

export default Contact;