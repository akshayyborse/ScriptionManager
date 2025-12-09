'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Search, Plus, Home, Settings, TrendingUp } from 'lucide-react'

interface Platform {
  id: string
  name: string
  category: string
  icon: string
  color: string
  typicalPrice: number
  billingCycle: 'monthly' | 'yearly'
  description?: string
  features?: string[]
}

const platforms: Platform[] = [
  // Streaming Services - OTT Platforms
  { id: '1', name: 'Netflix', category: 'Streaming', icon: 'N', color: 'bg-red-600', typicalPrice: 15.49, billingCycle: 'monthly', description: 'Movies, TV shows, originals', features: ['4K HDR', 'Offline Downloads', 'Multiple Profiles'] },
  { id: '2', name: 'Disney+', category: 'Streaming', icon: 'D', color: 'bg-blue-600', typicalPrice: 13.99, billingCycle: 'monthly', description: 'Disney, Pixar, Marvel, Star Wars', features: ['4K HDR', 'GroupWatch', 'Downloads'] },
  { id: '3', name: 'Amazon Prime Video', category: 'Streaming', icon: 'P', color: 'bg-orange-500', typicalPrice: 14.99, billingCycle: 'monthly', description: 'Movies, shows, Prime benefits', features: ['4K Ultra HD', 'X-Ray', 'Prime Benefits'] },
  { id: '4', name: 'HBO Max', category: 'Streaming', icon: 'H', color: 'bg-purple-600', typicalPrice: 15.99, billingCycle: 'monthly', description: 'HBO, Warner Bros content', features: ['4K HDR', 'Offline Downloads', 'Max Originals'] },
  { id: '5', name: 'Hulu', category: 'Streaming', icon: 'H', color: 'bg-green-500', typicalPrice: 7.99, billingCycle: 'monthly', description: 'Current TV, movies, originals', features: ['Live TV', 'Cloud DVR', 'Multiple Profiles'] },
  { id: '6', name: 'Apple TV+', category: 'Streaming', icon: 'A', color: 'bg-gray-800', typicalPrice: 9.99, billingCycle: 'monthly', description: 'Apple Originals content', features: ['4K HDR', 'Family Sharing', 'Offline Downloads'] },
  { id: '7', name: 'Paramount+', category: 'Streaming', icon: 'P', color: 'bg-blue-700', typicalPrice: 9.99, billingCycle: 'monthly', description: 'Paramount, CBS, Nickelodeon', features: ['4K Streaming', 'Live Sports', 'SHOWTIME'] },
  { id: '8', name: 'Peacock', category: 'Streaming', icon: 'P', color: 'bg-yellow-500', typicalPrice: 5.99, billingCycle: 'monthly', description: 'NBCUniversal content', features: ['Live TV', 'Sports', 'Premium Tiers'] },
  { id: '9', name: 'Star+', category: 'Streaming', icon: 'S', color: 'bg-violet-600', typicalPrice: 9.99, billingCycle: 'monthly', description: 'Star content, international', features: ['4K HDR', 'Multi-language', 'Downloads'] },
  { id: '10', name: 'Discovery+', category: 'Streaming', icon: 'D', color: 'bg-orange-600', typicalPrice: 8.99, billingCycle: 'monthly', description: 'Discovery, HGTV, Food Network', features: ['Lifestyle Content', 'Live TV', 'Reality Shows'] },
  
  // International Streaming
  { id: '11', name: 'Hotstar', category: 'Streaming', icon: 'H', color: 'bg-blue-600', typicalPrice: 12.99, billingCycle: 'monthly', description: 'Disney content India', features: ['Cricket', 'Bollywood', 'Regional Content'] },
  { id: '12', name: 'Viki', category: 'Streaming', icon: 'V', color: 'bg-green-600', typicalPrice: 9.99, billingCycle: 'monthly', description: 'Asian dramas, movies', features: ['Multi-language', 'Community Subtitles', 'Offline View'] },
  { id: '13', name: 'Crunchyroll', category: 'Streaming', icon: 'C', color: 'bg-orange-600', typicalPrice: 9.99, billingCycle: 'monthly', description: 'Anime, manga content', features: ['Simulcasts', 'Manga Library', 'Offline Viewing'] },
  { id: '14', name: 'BBC iPlayer', category: 'Streaming', icon: 'B', color: 'bg-red-700', typicalPrice: 0, billingCycle: 'monthly', description: 'BBC content UK', features: ['Live TV', 'Catch-up', 'Radio'] },
  { id: '15', name: 'All 4', category: 'Streaming', icon: '4', color: 'bg-green-700', typicalPrice: 0, billingCycle: 'monthly', description: 'Channel 4 content UK', features: ['Live TV', 'On Demand', 'Box Sets'] },
  
  // Music Streaming
  { id: '16', name: 'Spotify', category: 'Music', icon: 'S', color: 'bg-green-600', typicalPrice: 10.99, billingCycle: 'monthly', description: 'Music, podcasts, videos', features: ['30M+ Songs', 'Offline Downloads', 'Podcasts'] },
  { id: '17', name: 'Apple Music', category: 'Music', icon: 'A', color: 'bg-red-500', typicalPrice: 10.99, billingCycle: 'monthly', description: '90M+ songs, lossless audio', features: ['Lossless Audio', 'Spatial Audio', 'Music Videos'] },
  { id: '18', name: 'YouTube Music', category: 'Music', icon: 'Y', color: 'bg-red-600', typicalPrice: 10.99, billingCycle: 'monthly', description: 'Music videos, live performances', features: ['Background Play', 'Downloads', 'Ad-free'] },
  { id: '19', name: 'Amazon Music Unlimited', category: 'Music', icon: 'M', color: 'bg-blue-600', typicalPrice: 9.99, billingCycle: 'monthly', description: '100M+ songs, Alexa integration', features: ['HD Audio', 'Voice Control', 'Offline Mode'] },
  { id: '20', name: 'Tidal', category: 'Music', icon: 'T', color: 'bg-black', typicalPrice: 10.99, billingCycle: 'monthly', description: 'Hi-fi audio, artist-owned', features: ['MQA Audio', 'Music Videos', 'Artist Radio'] },
  { id: '21', name: 'Pandora', category: 'Music', icon: 'P', color: 'bg-blue-500', typicalPrice: 9.99, billingCycle: 'monthly', description: 'Personalized radio, podcasts', features: ['Music Genome', 'Podcasts', 'Offline Mode'] },
  { id: '22', name: 'Deezer', category: 'Music', icon: 'D', color: 'bg-purple-600', typicalPrice: 10.99, billingCycle: 'monthly', description: '90M+ songs, flow feature', features: ['Flow Feature', 'Lyrics', 'Hi-Fi Audio'] },
  
  // Gaming Services
  { id: '23', name: 'Xbox Game Pass Ultimate', category: 'Gaming', icon: 'X', color: 'bg-green-500', typicalPrice: 16.99, billingCycle: 'monthly', description: '100+ games, EA Play', features: ['Cloud Gaming', 'Multiplayer', 'First-party Games'] },
  { id: '24', name: 'PlayStation Plus', category: 'Gaming', icon: 'P', color: 'bg-blue-600', typicalPrice: 17.99, billingCycle: 'monthly', description: 'Monthly games, online multiplayer', features: ['Online Multiplayer', 'Monthly Games', 'Cloud Storage'] },
  { id: '25', name: 'Nintendo Switch Online', category: 'Gaming', icon: 'N', color: 'bg-red-500', typicalPrice: 49.99, billingCycle: 'yearly', description: 'Online play, classic games', features: ['Online Play', 'Classic Games', 'Cloud Saves'] },
  { id: '26', name: 'EA Play', category: 'Gaming', icon: 'E', color: 'bg-yellow-600', typicalPrice: 14.99, billingCycle: 'monthly', description: 'EA games library', features: ['Early Access', 'In-game Rewards', 'Trials'] },
  { id: '27', name: 'Ubisoft+', category: 'Gaming', icon: 'U', color: 'bg-blue-700', typicalPrice: 17.99, billingCycle: 'monthly', description: 'Ubisoft games catalog', features: ['Premium Editions', 'Monthly Games', 'Early Access'] },
  { id: '28', name: 'Steam', category: 'Gaming', icon: 'S', color: 'bg-gray-700', typicalPrice: 0, billingCycle: 'monthly', description: 'PC gaming platform', features: ['Game Library', 'Workshop', 'Community'] },
  
  // Software & Productivity
  { id: '29', name: 'Microsoft 365', category: 'Software', icon: 'M', color: 'bg-blue-700', typicalPrice: 12.99, billingCycle: 'monthly', description: 'Office apps, cloud storage', features: ['1TB Storage', 'Office Apps', 'Family Sharing'] },
  { id: '30', name: 'Adobe Creative Cloud', category: 'Software', icon: 'A', color: 'bg-red-600', typicalPrice: 54.99, billingCycle: 'monthly', description: 'Creative software suite', features: ['All Apps', '100GB Storage', 'Fonts'] },
  { id: '31', name: 'Google One', category: 'Software', icon: 'G', color: 'bg-blue-500', typicalPrice: 9.99, billingCycle: 'monthly', description: 'Cloud storage, Gmail features', features: ['2TB Storage', 'VPN', 'Premium Support'] },
  { id: '32', name: 'Dropbox', category: 'Software', icon: 'D', color: 'bg-blue-600', typicalPrice: 11.99, billingCycle: 'monthly', description: 'Cloud storage, file sync', features: ['2TB Storage', 'File Sync', 'Version History'] },
  { id: '33', name: 'iCloud+', category: 'Software', icon: 'I', color: 'bg-blue-500', typicalPrice: 9.99, billingCycle: 'monthly', description: 'Apple cloud storage', features: ['2TB Storage', 'Private Relay', 'Hide My Email'] },
  { id: '34', name: 'Notion', category: 'Software', icon: 'N', color: 'bg-black', typicalPrice: 10, billingCycle: 'monthly', description: 'All-in-one workspace', features: ['Unlimited Blocks', 'Version History', 'Collaboration'] },
  { id: '35', name: 'Figma', category: 'Software', icon: 'F', color: 'bg-purple-600', typicalPrice: 15, billingCycle: 'monthly', description: 'Collaborative design tool', features: ['Unlimited Files', 'Version History', 'Team Library'] },
  { id: '36', name: 'Slack', category: 'Software', icon: 'S', color: 'bg-purple-600', typicalPrice: 8.75, billingCycle: 'monthly', description: 'Team communication platform', features: ['Unlimited History', 'Huddles', 'Workflows'] },
  { id: '37', name: 'Zoom Pro', category: 'Software', icon: 'Z', color: 'bg-blue-600', typicalPrice: 14.99, billingCycle: 'monthly', description: 'Video conferencing', features: ['30hr Meetings', 'Cloud Recording', 'Breakout Rooms'] },
  
  // News & Magazines
  { id: '38', name: 'The New York Times', category: 'News', icon: 'T', color: 'bg-black', typicalPrice: 17, billingCycle: 'monthly', description: 'Premium news, crosswords', features: ['Unlimited Articles', 'Crosswords', 'Cooking'] },
  { id: '39', name: 'Wall Street Journal', category: 'News', icon: 'W', color: 'bg-blue-700', typicalPrice: 38.99, billingCycle: 'monthly', description: 'Business news, markets', features: ['WSJ+ Content', 'Exclusive Reports', 'Audio Articles'] },
  { id: '40', name: 'The Economist', category: 'News', icon: 'E', color: 'bg-red-600', typicalPrice: 24.99, billingCycle: 'monthly', description: 'Global news, analysis', features: ['Weekly Edition', 'Audio', 'Digital Archive'] },
  { id: '41', name: 'Medium', category: 'News', icon: 'M', color: 'bg-black', typicalPrice: 5, billingCycle: 'monthly', description: 'Quality writing, journalism', features: ['Unlimited Reading', 'Audio Stories', 'Writer Support'] },
  { id: '42', name: 'Substack', category: 'News', icon: 'S', color: 'bg-orange-500', typicalPrice: 5, billingCycle: 'monthly', description: 'Newsletter platform', features: ['Creator Support', 'Podcasts', 'Community'] },
  
  // Fitness & Health
  { id: '43', name: 'Peloton', category: 'Fitness', icon: 'P', color: 'bg-red-600', typicalPrice: 12.99, billingCycle: 'monthly', description: 'Fitness classes, equipment', features: ['Live Classes', 'On-demand', 'Progress Tracking'] },
  { id: '44', name: 'Fitbit Premium', category: 'Fitness', icon: 'F', color: 'bg-blue-600', typicalPrice: 9.99, billingCycle: 'monthly', description: 'Health tracking, insights', features: ['Advanced Metrics', 'Guided Programs', 'Wellness Reports'] },
  { id: '45', name: 'MyFitnessPal', category: 'Fitness', icon: 'M', color: 'bg-blue-500', typicalPrice: 19.99, billingCycle: 'monthly', description: 'Calorie tracking, nutrition', features: ['Barcode Scanner', 'Recipe Import', 'Meal Planning'] },
  { id: '46', name: 'Headspace', category: 'Fitness', icon: 'H', color: 'bg-orange-500', typicalPrice: 12.99, billingCycle: 'monthly', description: 'Meditation, mindfulness', features: ['Guided Meditation', 'Sleep Content', 'Focus Music'] },
  { id: '47', name: 'Calm', category: 'Fitness', icon: 'C', color: 'bg-teal-600', typicalPrice: 14.99, billingCycle: 'monthly', description: 'Meditation, sleep stories', features: ['Sleep Stories', 'Masterclasses', 'Daily Calm'] },
  
  // Learning & Education
  { id: '48', name: 'Coursera Plus', category: 'Education', icon: 'C', color: 'bg-blue-600', typicalPrice: 59, billingCycle: 'monthly', description: 'Online courses, certificates', features: ['Unlimited Courses', 'Certificates', 'Specializations'] },
  { id: '49', name: 'Skillshare', category: 'Education', icon: 'S', color: 'bg-green-600', typicalPrice: 19, billingCycle: 'monthly', description: 'Creative skills courses', features: ['Unlimited Classes', 'Offline Access', 'Project Gallery'] },
  { id: '50', name: 'MasterClass', category: 'Education', icon: 'M', color: 'bg-red-600', typicalPrice: 15, billingCycle: 'monthly', description: 'Celebrity-taught classes', features: ['All Access', 'Downloads', 'Workbook'] },
  { id: '51', name: 'Duolingo Plus', category: 'Education', icon: 'D', color: 'bg-green-600', typicalPrice: 12.99, billingCycle: 'monthly', description: 'Language learning platform', features: ['No Ads', 'Offline Lessons', 'Progress Quiz'] },
  { id: '52', name: 'Babbel', category: 'Education', icon: 'B', color: 'bg-red-500', typicalPrice: 13.95, billingCycle: 'monthly', description: 'Language learning app', features: ['Interactive Lessons', 'Speech Recognition', 'Review Manager'] },
  
  // Shopping & Delivery
  { id: '53', name: 'Amazon Prime', category: 'Shopping', icon: 'P', color: 'bg-orange-500', typicalPrice: 14.99, billingCycle: 'monthly', description: 'Free shipping, Prime benefits', features: ['Free Shipping', 'Prime Video', 'Music'] },
  { id: '54', name: 'Walmart+', category: 'Shopping', icon: 'W', color: 'bg-blue-600', typicalPrice: 12.95, billingCycle: 'monthly', description: 'Free shipping, savings', features: ['Free Shipping', 'Scan & Go', 'Fuel Discounts'] },
  { id: '55', name: 'Instacart+', category: 'Shopping', icon: 'I', color: 'bg-green-600', typicalPrice: 9.99, billingCycle: 'monthly', description: 'Grocery delivery service', features: ['Free Delivery', 'Reduced Fees', 'Priority Support'] },
  { id: '56', name: 'DoorDash DashPass', category: 'Shopping', icon: 'D', color: 'bg-red-600', typicalPrice: 9.99, billingCycle: 'monthly', description: 'Food delivery benefits', features: ['$0 Delivery', 'Reduced Fees', 'Exclusive Offers'] },
  
  // VPN & Security
  { id: '57', name: 'NordVPN', category: 'Security', icon: 'N', color: 'bg-blue-700', typicalPrice: 11.99, billingCycle: 'monthly', description: 'VPN service, privacy', features: ['5500+ Servers', 'Kill Switch', 'No Logs'] },
  { id: '58', name: 'ExpressVPN', category: 'Security', icon: 'E', color: 'bg-yellow-600', typicalPrice: 12.95, billingCycle: 'monthly', description: 'VPN service, security', features: ['3000+ Servers', 'Split Tunneling', 'TrustedServer'] },
  { id: '59', name: '1Password', category: 'Security', icon: '1', color: 'bg-blue-600', typicalPrice: 2.99, billingCycle: 'monthly', description: 'Password manager', features: ['Unlimited Passwords', 'Family Sharing', 'Watchtower'] },
  { id: '60', name: 'LastPass', category: 'Security', icon: 'L', color: 'bg-red-600', typicalPrice: 3, billingCycle: 'monthly', description: 'Password management', features: ['Unlimited Devices', 'Secure Notes', 'Emergency Access'] },
  
  // Dating & Social
  { id: '61', name: 'Tinder Plus', category: 'Social', icon: 'T', color: 'bg-pink-600', typicalPrice: 29.99, billingCycle: 'monthly', description: 'Dating app premium features', features: ['Unlimited Likes', 'Passport', 'Boosts'] },
  { id: '62', name: 'Bumble Premium', category: 'Social', icon: 'B', color: 'bg-yellow-500', typicalPrice: 32.99, billingCycle: 'monthly', description: 'Dating app features', features: ['Unlimited Swipes', 'Backtrack', 'Beeline'] },
  { id: '63', name: 'HingeX', category: 'Social', icon: 'H', color: 'bg-black', typicalPrice: 29.99, billingCycle: 'monthly', description: 'Relationship-focused dating', features: ['Advanced Preferences', 'Date Ideas', 'Priority Likes'] },
  
  // Other Services
  { id: '64', name: 'OnlyFans', category: 'Other', icon: 'O', color: 'bg-blue-600', typicalPrice: 0, billingCycle: 'monthly', description: 'Creator subscription platform', features: ['Creator Content', 'Direct Messaging', 'Tips'] },
  { id: '65', name: 'Patreon', category: 'Other', icon: 'P', color: 'bg-orange-600', typicalPrice: 0, billingCycle: 'monthly', description: 'Creator support platform', features: ['Creator Support', 'Exclusive Content', 'Community'] },
  { id: '66', name: 'GitHub Pro', category: 'Other', icon: 'G', color: 'bg-black', typicalPrice: 4, billingCycle: 'monthly', description: 'Developer tools, code hosting', features: ['Private Repos', 'Code Owners', 'Advanced Tools'] },
  { id: '67', name: 'ChatGPT Plus', category: 'Other', icon: 'C', color: 'bg-green-600', typicalPrice: 20, billingCycle: 'monthly', description: 'AI assistant premium', features: ['GPT-4 Access', 'Faster Response', 'Priority Access'] },
]

const categories = ['Popular', 'Streaming', 'Music', 'Gaming', 'Software', 'News', 'Fitness', 'Education', 'Shopping', 'Security', 'Social', 'Other']

export default function AddSubscription() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Popular')
  const [addedSubscriptions, setAddedSubscriptions] = useState<string[]>([])

  const filteredPlatforms = platforms.filter(platform => {
    const matchesSearch = platform.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'Popular' || platform.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddSubscription = (platformId: string) => {
    setAddedSubscriptions(prev => [...prev, platformId])
    // In a real app, this would make an API call
    setTimeout(() => {
      setAddedSubscriptions(prev => prev.filter(id => id !== platformId))
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile Container */}
      <div className="max-w-md mx-auto bg-background min-h-screen flex flex-col">
        
        {/* Header */}
        <header className="p-6 pb-4">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Add Subscription</h1>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search platforms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 pb-20 overflow-y-auto">
          <div className="space-y-3">
            {filteredPlatforms.map(platform => (
              <Card key={platform.id} className="bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-12 h-12 ${platform.color} rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                        {platform.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{platform.name}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {platform.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs font-medium text-primary">
                            ${platform.typicalPrice}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            /{platform.billingCycle === 'monthly' ? 'month' : 'year'}
                          </span>
                        </div>
                        {platform.features && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {platform.features.slice(0, 3).map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
                                {feature}
                              </Badge>
                            ))}
                            {platform.features.length > 3 && (
                              <Badge variant="outline" className="text-xs px-2 py-0.5">
                                +{platform.features.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleAddSubscription(platform.id)}
                      disabled={addedSubscriptions.includes(platform.id)}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 flex-shrink-0"
                      size="sm"
                    >
                      {addedSubscriptions.includes(platform.id) ? 'Added!' : 'Add'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
          <div className="max-w-md mx-auto px-6 py-3">
            <div className="flex justify-around items-center">
              <Button variant="ghost" size="icon" onClick={() => window.location.href = '/'}>
                <Home className="h-5 w-5" />
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="h-5 w-5 mr-2" />
                Add
              </Button>
              <Button variant="ghost" size="icon" onClick={() => window.location.href = '/analytics'}>
                <TrendingUp className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}