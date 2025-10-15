import { useState, useEffect } from 'react';
import { Heart, X, Star, MapPin, DollarSign, Bed, Bath, Calendar } from 'lucide-react';
import { useApartmentsStore } from '@/stores/apartmentsStore';
import { useShortlistStore } from '@/stores/shortlistStore';
import type { Apartment } from '@/types/apartment';

export const HomeScreen = () => {
  const { 
    apartments,
    currentIndex,
    selectCurrentApartment,
    swipeLike,
    swipePass,
    swipeSuperLike,
    setApartments
  } = useApartmentsStore();

  const { toggleShortlist, selectIsInShortlist } = useShortlistStore();

  const currentApartment = selectCurrentApartment();
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'up' | null>(null);

  // Initialize mock apartments
  useEffect(() => {
    if (apartments.length === 0) {
      const mockApartments: Apartment[] = [
        {
          id: '1',
          title: 'Luxury 2BR in Williamsburg',
          address: {
            street: '123 Bedford Ave',
            city: 'Brooklyn',
            state: 'NY',
            zipCode: '11211',
            neighborhood: 'Williamsburg'
          },
          price: {
            monthly: 3200,
            currency: 'USD',
            splitType: 'equal',
          },
          details: {
            bedrooms: 2,
            bathrooms: 1,
            squareFeet: 950,
            floor: 4,
            buildingType: 'apartment',
            yearBuilt: 2018,
          },
          amenities: ['dishwasher', 'laundry', 'gym', 'rooftop'],
          images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        },
        {
          id: '2',
          title: 'Cozy Studio in East Village',
          address: {
            street: '456 E 9th St',
            city: 'New York',
            state: 'NY',
            zipCode: '10009',
            neighborhood: 'East Village'
          },
          price: {
            monthly: 2400,
            currency: 'USD',
            splitType: 'equal',
          },
          details: {
            bedrooms: 1,
            bathrooms: 1,
            squareFeet: 550,
            floor: 2,
            buildingType: 'brownstone',
            yearBuilt: 1920,
          },
          amenities: ['laundry', 'backyard'],
          images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        },
        {
          id: '3',
          title: 'Modern 3BR with Roommates',
          address: {
            street: '789 Kent Ave',
            city: 'Brooklyn',
            state: 'NY',
            zipCode: '11249',
            neighborhood: 'Greenpoint'
          },
          price: {
            monthly: 1800,
            currency: 'USD',
            splitType: 'equal',
          },
          details: {
            bedrooms: 3,
            bathrooms: 2,
            squareFeet: 1200,
            floor: 3,
            buildingType: 'apartment',
            yearBuilt: 2020,
          },
          amenities: ['dishwasher', 'laundry', 'gym', 'doorman', 'parking'],
          images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'],
          roommateInfo: {
            availableRooms: 1,
            totalRooms: 3,
            currentRoommates: [],
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        },
      ];
      setApartments(mockApartments);
    }
  }, [apartments.length, setApartments]);

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    if (!currentApartment) return;

    setSwipeDirection(direction);
    
    setTimeout(() => {
      if (direction === 'left') {
        swipePass(currentApartment.id);
      } else if (direction === 'right') {
        swipeLike(currentApartment.id);
      } else if (direction === 'up') {
        swipeSuperLike(currentApartment.id);
      }
      setSwipeDirection(null);
    }, 300);
  };

  if (!currentApartment) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-gray-50">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No more apartments
          </h2>
          <p className="text-gray-600 mb-6">
            Check back later for new listings or adjust your preferences
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Update Preferences
          </button>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const isShortlisted = selectIsInShortlist(currentApartment.id);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Discover</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {currentIndex + 1} of {apartments.length}
            </span>
          </div>
        </div>
      </div>

      {/* Card Container */}
      <div className="flex-1 p-4 flex items-center justify-center">
        <div 
          className={`relative w-full max-w-lg h-[600px] transition-transform duration-300 ${
            swipeDirection === 'left' ? '-translate-x-full opacity-0' :
            swipeDirection === 'right' ? 'translate-x-full opacity-0' :
            swipeDirection === 'up' ? '-translate-y-full opacity-0' : ''
          }`}
        >
          {/* Apartment Card */}
          <div className="relative h-full bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Image */}
            <div className="relative h-2/3 bg-gray-200">
              <img
                src={currentApartment.images[0]}
                alt={currentApartment.title}
                className="w-full h-full object-cover"
              />
              
              {/* Compatibility Badge */}
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-green-500 text-white rounded-full text-sm font-semibold flex items-center gap-1">
                <Star className="w-4 h-4 fill-current" />
                95% Match
              </div>

              {/* Save Button */}
              <button
                onClick={() => toggleShortlist(currentApartment.id)}
                className={`absolute top-4 left-4 p-2 rounded-full transition-colors ${
                  isShortlisted 
                    ? 'bg-yellow-400 text-white' 
                    : 'bg-white/90 text-gray-700 hover:bg-white'
                }`}
              >
                <Star className={`w-5 h-5 ${isShortlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Info */}
            <div className="h-1/3 p-5 flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {currentApartment.title}
              </h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{currentApartment.address.neighborhood}</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4 text-gray-600" />
                    <span className="font-medium">{currentApartment.details.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4 text-gray-600" />
                    <span className="font-medium">{currentApartment.details.bathrooms} bath</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="font-medium">{currentApartment.details.squareFeet} sq ft</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 text-2xl font-bold text-gray-900">
                    <DollarSign className="w-6 h-6" />
                    {formatCurrency(currentApartment.price.monthly).replace('$', '')}
                  </div>
                  <p className="text-xs text-gray-500">per month</p>
                </div>
                
                {currentApartment.roommateInfo && (
                  <div className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
                    Room available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-6 bg-white border-t border-gray-200">
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => handleSwipe('left')}
            className="w-16 h-16 bg-white border-2 border-red-500 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors shadow-lg"
          >
            <X className="w-8 h-8 text-red-500" />
          </button>

          <button
            onClick={() => handleSwipe('up')}
            className="w-14 h-14 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors shadow-lg"
          >
            <Star className="w-6 h-6 text-blue-500" />
          </button>

          <button
            onClick={() => handleSwipe('right')}
            className="w-16 h-16 bg-white border-2 border-green-500 rounded-full flex items-center justify-center hover:bg-green-50 transition-colors shadow-lg"
          >
            <Heart className="w-8 h-8 text-green-500" />
          </button>
        </div>
      </div>
    </div>
  );
};
