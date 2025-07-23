import React from 'react';
import { WorkoutCourse } from '../../types/workOutCourse';
import { X, Clock, User, Calendar, FileText } from 'lucide-react';

interface CourseModalProps {
  course: WorkoutCourse | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({ course, isOpen, onClose }) => {
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={course.imageurl} 
            alt={course.coursename}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {course.coursename}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="bg-purple-100 p-2 rounded-lg">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Trainer</p>
                <p className="font-semibold text-gray-900">{course.trainername}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-semibold text-gray-900">{course.durationweek} weeks</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Course ID</p>
                <p className="font-semibold text-gray-900 text-xs">{course.courseid}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-900">Description</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {course.description}
            </p>
          </div>
          
          <div className="flex gap-4">
            <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
              Enroll Now
            </button>
            <button 
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};