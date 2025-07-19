import React, { useState } from 'react';
import { X, Plus, User, Clock, FileText, Image } from 'lucide-react';
import { WorkoutCourse } from '../../types/workOutCourse';
import { Customer } from '../../types/customer'
interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCourse: (course: Omit<WorkoutCourse, 'courseid'>) => void;
  trainers: Customer[];
}

export const AddCourseModal: React.FC<AddCourseModalProps> = ({ 
  isOpen, 
  onClose, 
  onAddCourse, 
  trainers 
}) => {
  const [formData, setFormData] = useState({
    coursename: '',
    imageurl: '',
    personaltrainer: '',
    durationweek: 1,
    description: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'durationweek' ? parseInt(value) || 1 : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.coursename.trim()) {
      newErrors.coursename = 'Course name is required';
    }
    
    if (!formData.imageurl.trim()) {
      newErrors.imageurl = 'Image URL is required';
    } else if (!isValidUrl(formData.imageurl)) {
      newErrors.imageurl = 'Please enter a valid URL';
    }
    
    if (!formData.personaltrainer) {
      newErrors.personaltrainer = 'Please select a trainer';
    }
    
    if (formData.durationweek < 1 || formData.durationweek > 52) {
      newErrors.durationweek = 'Duration must be between 1 and 52 weeks';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const selectedTrainer = trainers.find(t => t.customerID === formData.personaltrainer);
      const newCourse: Omit<WorkoutCourse, 'courseid'> = {
        ...formData,
        trainername: selectedTrainer?.name || ''
      };
      
      onAddCourse(newCourse);
      
      // Reset form
      setFormData({
        coursename: '',
        imageurl: '',
        personaltrainer: '',
        durationweek: 1,
        description: ''
      });
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      coursename: '',
      imageurl: '',
      personaltrainer: '',
      durationweek: 1,
      description: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Add New Course</h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Course Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4" />
              Course Name
            </label>
            <input
              type="text"
              name="coursename"
              value={formData.coursename}
              onChange={handleInputChange}
              placeholder="Enter course name..."
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                errors.coursename ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.coursename && (
              <p className="text-red-500 text-sm mt-1">{errors.coursename}</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Image className="w-4 h-4" />
              Image URL
            </label>
            <input
              type="url"
              name="imageurl"
              value={formData.imageurl}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                errors.imageurl ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.imageurl && (
              <p className="text-red-500 text-sm mt-1">{errors.imageurl}</p>
            )}
            {formData.imageurl && isValidUrl(formData.imageurl) && (
              <div className="mt-3">
                <img 
                  src={formData.imageurl} 
                  alt="Preview" 
                  className="w-full h-32 object-cover rounded-lg border"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Personal Trainer */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4" />
              Personal Trainer
            </label>
            <select
              name="personaltrainer"
              value={formData.personaltrainer}
              onChange={handleInputChange}
              className={`text-black w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none bg-white ${
                errors.personaltrainer ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="" className='text-black'>Select a trainer...</option>
              {trainers.map(trainer => (
                <option key={trainer.customerID} value={trainer.customerID}>
                  {trainer.name} - {trainer.email}
                </option>
              ))}
            </select>
            {errors.personaltrainer && (
              <p className="text-red-500 text-sm mt-1">{errors.personaltrainer}</p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4" />
              Duration (weeks)
            </label>
            <input
              type="number"
              name="durationweek"
              value={formData.durationweek}
              onChange={handleInputChange}
              min="1"
              max="52"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                errors.durationweek ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.durationweek && (
              <p className="text-red-500 text-sm mt-1">{errors.durationweek}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4" />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the course objectives, target audience, and what participants will learn..."
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
              <p className="text-gray-500 text-sm ml-auto">
                {formData.description.length}/256 characters
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Thêm khóa tập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};