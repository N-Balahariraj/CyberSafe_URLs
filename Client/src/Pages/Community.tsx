import CommunityCard from '../Components/CommunityCard';

const CommunityPage = () => {
  const sampleReviews = [
    {
      url: 'https://example.com',
      title: 'Example Business Site',
      rating: 4.5,
      reviewCount: 128,
      lastAnalyzed: '2024-03-15',
      categories: ['Performance', 'SEO', 'Security'],
      summary: 'Strong performance metrics with excellent SEO practices. Minor security improvements recommended.'
    },
    {
      url: 'https://demo-store.com',
      title: 'Online Store Demo',
      rating: 3.8,
      reviewCount: 85,
      lastAnalyzed: '2024-03-14',
      categories: ['E-commerce', 'UX', 'Performance'],
      summary: 'Good user experience but needs optimization for better loading times. Mobile responsiveness could be improved.'
    },
    {
      url: 'https://tech-blog.net',
      title: 'Tech Blog Platform',
      rating: 4.8,
      reviewCount: 256,
      lastAnalyzed: '2024-03-13',
      categories: ['Content', 'Accessibility', 'SEO'],
      summary: 'Excellent content structure and accessibility features. Top-tier SEO implementation.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
        <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Recent Website Reviews
        </span>
      </h2>
      <div className="grid gap-8 max-w-5xl mx-auto">
        {sampleReviews.map((review, index) => (
          <CommunityCard key={index} review={review}/>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;