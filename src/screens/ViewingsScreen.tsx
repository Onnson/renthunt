import { Calendar, Clock, MapPin, Phone, Mail, CheckCircle, XCircle } from 'lucide-react';
import { useViewingsStore } from '@/stores/viewingsStore';
import { useApartmentsStore } from '@/stores/apartmentsStore';

export const ViewingsScreen = () => {
  const { 
    selectUpcomingViewings,
    selectTodayViewings,
    selectTotalScheduledViewings,
    cancelViewing
  } = useViewingsStore();

  const { apartments } = useApartmentsStore();

  const upcomingViewings = selectUpcomingViewings();
  const todayViewings = selectTodayViewings();
  const totalViewings = selectTotalScheduledViewings();

  const getApartmentDetails = (apartmentId: string) => {
    return apartments.find(apt => apt.id === apartmentId);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    const viewingDate = new Date(date);
    return today.toDateString() === viewingDate.toDateString();
  };

  if (totalViewings === 0) {
    return (
      <div className="h-full flex flex-col bg-gray-50">
        <div className="px-4 py-3 bg-white border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Viewings</h1>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No viewings scheduled
            </h2>
            <p className="text-gray-600 mb-6">
              Schedule viewings from your saved apartments to start touring
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Browse Apartments
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Viewings</h1>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            {totalViewings} scheduled
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Today's Viewings */}
        {todayViewings.length > 0 && (
          <div className="p-4 bg-blue-50 border-b border-blue-100">
            <h2 className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Today's Viewings ({todayViewings.length})
            </h2>
            <div className="space-y-3">
              {todayViewings.map((viewing) => {
                const apartment = getApartmentDetails(viewing.apartmentId);
                return (
                  <div
                    key={viewing.id}
                    className="bg-white rounded-xl p-4 shadow-sm border border-blue-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {apartment?.title || 'Apartment Viewing'}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{apartment?.address.neighborhood}</span>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium">
                        Today
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm mb-3">
                      <div className="flex items-center gap-1 text-gray-700">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{formatTime(viewing.dateTime)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-700">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(viewing.dateTime)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        Call
                      </button>
                      <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </button>
                      <button 
                        onClick={() => cancelViewing(viewing.id)}
                        className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Upcoming Viewings */}
        <div className="p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Upcoming Viewings
          </h2>
          <div className="space-y-3">
            {upcomingViewings
              .filter(v => !isToday(v.dateTime))
              .map((viewing) => {
                const apartment = getApartmentDetails(viewing.apartmentId);
                return (
                  <div
                    key={viewing.id}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {apartment?.title || 'Apartment Viewing'}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{apartment?.address.neighborhood}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        viewing.status === 'confirmed' 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {viewing.status === 'confirmed' ? (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Confirmed
                          </div>
                        ) : (
                          'Scheduled'
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm mb-3">
                      <div className="flex items-center gap-1 text-gray-700">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{formatTime(viewing.dateTime)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-700">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(viewing.dateTime)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Get Directions
                      </button>
                      <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        Reschedule
                      </button>
                      <button 
                        onClick={() => cancelViewing(viewing.id)}
                        className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
