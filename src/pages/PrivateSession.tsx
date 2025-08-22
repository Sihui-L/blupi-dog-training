import React from 'react';
import {
  Container,
  Text,
  Paper,
  Grid,
  List,
  Card,
  Button,
  TextInput,
  Textarea,
  Group,
  Stack,
  Badge,
  Divider,
  Image
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { type BookingFormData } from '../types';
import { useNotifications } from '../hooks/useNotifications';
import { TEMPLATE_IMAGES } from '../constants/images';
import PageHeader from '../components/common/PageHeader';

const PrivateSession: React.FC = () => {
  const { showSuccess } = useNotifications();
  
  const form = useForm<BookingFormData>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dogName: '',
      dogAge: '',
      dogBreed: '',
      serviceId: 'private-session',
      preferredDate: '',
      message: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      firstName: (value) => value.length > 0 ? null : 'First name is required',
      lastName: (value) => value.length > 0 ? null : 'Last name is required',
    },
  });

  const handleSubmit = (values: BookingFormData) => {
    console.log('Private session enquiry submitted:', values);
    
    showSuccess(
      'Enquiry sent!',
      'Thank you for your enquiry! We\'ll get back to you within 24 hours to discuss your needs.'
    );

    form.reset();
  };

  return (
    <>
      <PageHeader 
        title="Private 1-2-1 Session" 
        subtitle="Personalized one-on-one training sessions tailored to your dog's specific needs and behavioral challenges."
      />
      
      <Container size="lg" pb={80}>
        <Stack gap="xl">
          {/* Service Information with Image */}
          <Paper shadow="md" p="xl" radius="md">
            <Grid align="center">
              <Grid.Col span={{ base: 12, lg: 8 }}>
                <Text size="xl" fw={600} mb="lg" c="primary.9">
                  Who is this session for?
                </Text>
                
                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Text size="lg" fw={600} mb="md">Perfect for:</Text>
                    <List spacing="xs" c="gray.7">
                      <List.Item>Dogs with specific behavioral issues</List.Item>
                      <List.Item>Anxious or reactive dogs</List.Item>
                      <List.Item>Puppies needing foundation training</List.Item>
                      <List.Item>Dogs requiring specialized attention</List.Item>
                      <List.Item>Owners wanting personalized guidance</List.Item>
                    </List>
                  </Grid.Col>
                  
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Text size="lg" fw={600} mb="md">What's included:</Text>
                    <List spacing="xs" c="gray.7">
                      <List.Item>Comprehensive behavior assessment</List.Item>
                      <List.Item>Customized training plan</List.Item>
                      <List.Item>One-on-one instruction</List.Item>
                      <List.Item>Take-home practice materials</List.Item>
                      <List.Item>Follow-up support via phone/email</List.Item>
                    </List>
                  </Grid.Col>
                </Grid>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, lg: 4 }}>
                <div className="flex justify-center">
                  <Image
                    src={TEMPLATE_IMAGES.privateSession}
                    alt="Private dog training session"
                    radius="lg"
                    fallbackSrc={TEMPLATE_IMAGES.fallback}
                    w={300}
                    h={240}
                  />
                </div>
              </Grid.Col>
            </Grid>
          </Paper>

          {/* Pricing */}
          <Paper shadow="md" p="xl" radius="md">
            <Text size="xl" fw={600} mb="lg" c="primary.9">
              How many sessions?
            </Text>
          
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" p="lg" radius="md" withBorder>
                  <Stack align="center">
                    <Text size="lg" fw={600}>Single Session</Text>
                    <Text size="xl" fw={700} c="primary">£75</Text>
                    <Text c="dimmed" size="sm">90 minutes</Text>
                    <Text c="dimmed" size="sm">Perfect for assessment</Text>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" p="lg" radius="md" bg="primary.0" withBorder>
                  <Stack align="center">
                    <Badge color="primary" variant="filled">Most Popular</Badge>
                    <Text size="lg" fw={600}>Package of 3</Text>
                    <Text size="xl" fw={700} c="primary">£200</Text>
                    <Text c="dimmed" size="sm">Save £25</Text>
                    <Text c="dimmed" size="sm">Most popular choice</Text>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" p="lg" radius="md" withBorder>
                  <Stack align="center">
                    <Text size="lg" fw={600}>Package of 5</Text>
                    <Text size="xl" fw={700} c="primary">£300</Text>
                    <Text c="dimmed" size="sm">Save £75</Text>
                    <Text c="dimmed" size="sm">Best value</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Paper>

          {/* Enquiry Form */}
          <Paper shadow="md" p="xl" radius="md">
            <Text size="xl" fw={600} ta="center" mb="lg" c="primary.9">
              Send Me Your Questions
            </Text>
          
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="First Name"
                    placeholder="Enter your first name"
                    withAsterisk
                    {...form.getInputProps('firstName')}
                  />
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Last Name"
                    placeholder="Enter your last name"
                    withAsterisk
                    {...form.getInputProps('lastName')}
                  />
                </Grid.Col>
              </Grid>

              <TextInput
                label="Email"
                placeholder="Enter your email address"
                withAsterisk
                {...form.getInputProps('email')}
              />

              <TextInput
                label="Phone"
                placeholder="Enter your phone number"
                {...form.getInputProps('phone')}
              />

              <Grid>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <TextInput
                    label="Dog's Name"
                    placeholder="Enter dog's name"
                    {...form.getInputProps('dogName')}
                  />
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <TextInput
                    label="Dog's Age"
                    placeholder="Enter dog's age"
                    {...form.getInputProps('dogAge')}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                  <TextInput
                    label="Breed"
                    placeholder="Enter dog's breed"
                    {...form.getInputProps('dogBreed')}
                  />
                </Grid.Col>
              </Grid>

              <Textarea
                label="How can we assist you and your pet?"
                placeholder="Please describe any specific issues, training goals, or questions you have..."
                minRows={5}
                {...form.getInputProps('message')}
              />

              <Divider my="md" />

              <Group justify="center">
                <Button 
                  type="submit" 
                  size="lg"
                  color="primary"
                  radius="md"
                >
                  Submit Enquiry
                </Button>
              </Group>
            </Stack>
          </form>
          </Paper>
        </Stack>
      </Container>
    </>
  );
};

export default PrivateSession;