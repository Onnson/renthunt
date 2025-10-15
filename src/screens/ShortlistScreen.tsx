import { Heart, MapPin, DollarSign, Bed, Bath, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { useApartmentsStore } from '@/stores/apartmentsStore';
import { useShortlistStore } from '@/stores/shortlistStore';

export const ShortlistScreen = () => {
  const { apartments } = useApartmentsStore();
  const { 
    selectShortlistApartments, 
    selectShortlistCount,
    removeFromShortlist,
    sortOrder,
    setSortOrder 
  } = useShortlistStore();

  const shortlistApartments = selectShortlistApartments(apartments);
  const shortlistCount = selectShortlistCount();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  if (shortlistCount === 0) {
    return (
      <div className="h-full flex flex-col bg-gray-50">
        <div className="px-4 py-3 bg-white border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Saved Apartments</h1>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No saved apartments yet
            </h2>
            <p className="text-gray-600 mb-6">
              Tap the star icon while swiping to save apartments you like
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-gray-900">Saved Apartments</h1>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            {shortlistCount} saved
          </span>
        </div>
        
        {/* Sort Options */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { value: 'recent', label: 'Recent' },
            { value: 'price-low', label: 'Price: Low' },
            { value: 'price-high', label: 'Price: High' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSortOrder(option.value as any)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                sortOrder === option.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Apartment List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {shortlistApartments.map((apartment) => (
          <div
            key={apartment.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex gap-4 p-4">
              {/* Image */}
              <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={apartment.images[0]}
                  alt={apartment.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {apartment.title}
                  </h3>
                  <button
                    onClick={() => removeFromShortlist(apartment.id)}
                    className="p-1 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="line-clamp-1">{apartment.address.neighborhood}</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1">
                    <Bed className="w-3.5 h-3.5" />
                    {apartment.details.bedrooms}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-3.5 h-3.5" />
                    {apartment.details.bathrooms}
                  </span>
                  <span>{apartment.details.squareFeet} sq ft</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-lg font-bold text-gray-900">
                    <DollarSign className="w-4 h-4" />
                    {formatCurrency(apartment.price.monthly).replace('$', '')}
                  </div>
                  
                  {apartment.roommateInfo && (
                    <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-xs font-medium">
                      Room available
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex gap-2">
              <button className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Schedule Viewing
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
