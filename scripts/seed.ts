import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { getPayload } from 'payload'
import config from '../payload.config'

const seedDatabase = async () => {
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Found' : 'Missing')
  console.log('PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? 'Found' : 'Missing')
  
  const payload = await getPayload({
    config,
  })

  console.log('Starting database seeding...')

  try {
    // Create admin user if doesn't exist
    const existingUsers = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'admin@blupidogtraining.com'
        }
      }
    })

    if (existingUsers.totalDocs === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@blupidogtraining.com',
          password: 'password123',
          role: 'admin',
          firstName: 'Admin',
          lastName: 'User',
        },
      })
      console.log('✅ Admin user created')
    }

    // Seed Services
    const services = [
      {
        name: 'Behaviour Consultation',
        description: 'Initial consultation to assess your dog\'s behavioral needs and create a customized training plan.',
        price: 15,
        currency: 'GBP',
        duration: 60,
        type: 'private',
        isActive: true,
      },
      {
        name: 'Foundation Puppy Training',
        description: 'Comprehensive foundation training covering basic commands, socialization, and good manners.',
        price: 110,
        currency: 'GBP',
        duration: 90,
        type: 'group',
        isActive: true,
        maxParticipants: 4,
      },
      {
        name: 'Training Walk',
        description: 'Practical training session focusing on leash manners, recall, and real-world obedience.',
        price: 30,
        currency: 'GBP',
        duration: 60,
        type: 'group',
        isActive: true,
        maxParticipants: 3,
      },
      {
        name: 'Pre-ownership Consultation',
        description: 'Essential guidance for prospective dog owners covering breed selection, preparation, and training basics.',
        price: 35,
        currency: 'GBP',
        duration: 45,
        type: 'private',
        isActive: true,
      },
      {
        name: 'Advanced Obedience Workshop',
        description: 'Intensive workshop for dogs who have mastered basic commands and are ready for advanced training.',
        price: 75,
        currency: 'GBP',
        duration: 120,
        type: 'workshop',
        isActive: true,
        maxParticipants: 8,
      },
      {
        name: 'Reactive Dog Rehabilitation',
        description: 'Specialized program for dogs with reactivity issues, using positive reinforcement techniques.',
        price: 150,
        currency: 'GBP',
        duration: 90,
        type: 'private',
        isActive: true,
      },
    ]

    for (const service of services) {
      const existing = await payload.find({
        collection: 'services',
        where: {
          name: { equals: service.name }
        }
      })

      if (existing.totalDocs === 0) {
        await payload.create({
          collection: 'services',
          data: service,
        })
        console.log(`✅ Service created: ${service.name}`)
      }
    }

    // Seed Blog Posts
    const blogPosts = [
      {
        title: 'Getting Started with Puppy Training',
        description: 'Essential tips for training your new puppy from day one. Learn the fundamentals of house training, basic commands, and socialization.',
        content: [
          {
            children: [
              {
                text: 'Bringing home a new puppy is an exciting time, but it can also be overwhelming. The key to success is starting training early and being consistent with your approach.'
              }
            ]
          }
        ],
        status: 'published',
        publishedAt: new Date().toISOString(),
        tags: [
          { tag: 'puppies' },
          { tag: 'basic training' },
          { tag: 'house training' },
          { tag: 'socialization' }
        ],
      },
      {
        title: 'Understanding Dog Body Language',
        description: 'Learn to read your dog\'s signals and improve communication between you and your pet.',
        content: [
          {
            children: [
              {
                text: 'Dogs communicate primarily through body language. Understanding these signals can help prevent behavioral issues and strengthen your bond with your pet.'
              }
            ]
          }
        ],
        status: 'published',
        publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        tags: [
          { tag: 'behavior' },
          { tag: 'communication' },
          { tag: 'body language' }
        ],
      },
      {
        title: 'The Power of Positive Reinforcement',
        description: 'Why positive training methods work better than punishment and how to implement them effectively.',
        content: [
          {
            children: [
              {
                text: 'Positive reinforcement is not just more humane - it\'s also more effective. Learn how to use rewards, timing, and consistency to shape your dog\'s behavior.'
              }
            ]
          }
        ],
        status: 'published',
        publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        tags: [
          { tag: 'positive training' },
          { tag: 'behavior modification' },
          { tag: 'rewards' }
        ],
      },
      {
        title: 'Dealing with Separation Anxiety',
        description: 'Help your dog feel comfortable when left alone with these proven techniques.',
        content: [
          {
            children: [
              {
                text: 'Separation anxiety is one of the most common behavioral issues in dogs. With patience and the right approach, you can help your dog feel secure when you\'re away.'
              }
            ]
          }
        ],
        status: 'published',
        publishedAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        tags: [
          { tag: 'anxiety' },
          { tag: 'behavior' },
          { tag: 'alone time' }
        ],
      },
      {
        title: 'Leash Training Made Easy',
        description: 'Transform your walks from a struggle to an enjoyable experience for both you and your dog.',
        content: [
          {
            children: [
              {
                text: 'A dog that pulls on the leash makes walks stressful and unpleasant. Learn techniques to teach your dog to walk nicely on a loose leash.'
              }
            ]
          }
        ],
        status: 'published',
        publishedAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
        tags: [
          { tag: 'leash training' },
          { tag: 'walking' },
          { tag: 'exercise' }
        ],
      },
      {
        title: 'Socialization: The Key to a Well-Adjusted Dog',
        description: 'How proper socialization during puppyhood sets the foundation for a confident, friendly adult dog.',
        content: [
          {
            children: [
              {
                text: 'The socialization period is critical for puppies. During this time, positive experiences with people, animals, and environments shape their adult personality.'
              }
            ]
          }
        ],
        status: 'published',
        publishedAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
        tags: [
          { tag: 'socialization' },
          { tag: 'puppies' },
          { tag: 'confidence' },
          { tag: 'behavior' }
        ],
      },
    ]

    for (const post of blogPosts) {
      const existing = await payload.find({
        collection: 'posts',
        where: {
          title: { equals: post.title }
        }
      })

      if (existing.totalDocs === 0) {
        await payload.create({
          collection: 'posts',
          data: post,
        })
        console.log(`✅ Blog post created: ${post.title}`)
      }
    }

    // Seed Testimonials
    const testimonials = [
      {
        clientName: 'Sarah Johnson',
        review: 'Absolutely fantastic service! Our puppy went from chaos to calm in just a few sessions. The trainer was patient, knowledgeable, and really understood our needs.',
        rating: 5,
        isPublished: true,
      },
      {
        clientName: 'Mike Thompson',
        review: 'Professional and effective training methods. Our rescue dog had serious behavioral issues, but now he\'s a joy to be around. Highly recommended!',
        rating: 5,
        isPublished: true,
      },
      {
        clientName: 'Emma Davis',
        review: 'The group classes were perfect for our energetic spaniel. Great value for money and excellent results. We\'ve made so much progress!',
        rating: 5,
        isPublished: true,
      },
      {
        clientName: 'James Wilson',
        review: 'Gentle approach that really works. Our anxious dog is now much more confident and happy. Thank you for the amazing transformation!',
        rating: 5,
        isPublished: true,
      },
    ]

    for (const testimonial of testimonials) {
      const existing = await payload.find({
        collection: 'testimonials',
        where: {
          clientName: { equals: testimonial.clientName }
        }
      })

      if (existing.totalDocs === 0) {
        await payload.create({
          collection: 'testimonials',
          data: testimonial,
        })
        console.log(`✅ Testimonial created: ${testimonial.clientName}`)
      }
    }

    console.log('🎉 Database seeding completed successfully!')

  } catch (error) {
    console.error('❌ Error seeding database:', error)
  } finally {
    process.exit(0)
  }
}

seedDatabase()