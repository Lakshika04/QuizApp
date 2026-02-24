import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [error, setError] = useState('');

  const API_BASE = 'http://localhost:4000';

  useEffect(() => {
    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  const fetchResults = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Please login to view results');
      setLoading(false);
      return;
    }

    try {
      const query = selectedFilter !== 'all' ? `?technology=${selectedFilter}` : '';
      const response = await fetch(`${API_BASE}/api/results${query}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.results || []);
        setError('');
      } else {
        setError('Failed to fetch results');
        setResults([]);
      }
    } catch (err) {
      console.error('Error fetching results:', err);
      setError('Error fetching results');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getPerformanceBadge = (performance) => {
    const badges = {
      'Excellent': 'bg-emerald-100 text-emerald-800',
      'Good': 'bg-indigo-100 text-indigo-800',
      'Average': 'bg-yellow-100 text-yellow-800',
      'Needs work': 'bg-red-100 text-red-800',
    };
    return badges[performance] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">Quiz Results</h1>

          {error && (
            <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Filter buttons */}
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${selectedFilter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200'
                }`}
            >
              All
            </button>
            {['html', 'css', 'js', 'react', 'node', 'mongodb', 'java', 'python', 'cpp', 'bootstrap'].map(tech => (
              <button
                key={tech}
                onClick={() => setSelectedFilter(tech)}
                className={`px-4 py-2 rounded-lg font-medium transition ${selectedFilter === tech
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200'
                  }`}
              >
                {tech.toUpperCase()}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="mt-4 text-gray-600">Loading results...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600 text-lg">No results found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((result) => (
                <div key={result._id} className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition">
                  <div className="flex items-start justify-between p-4 border-b border-gray-100">
                    <div>
                      <h3 className="font-semibold text-slate-800">{result.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {result.level.charAt(0).toUpperCase() + result.level.slice(1)}
                      </p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPerformanceBadge(result.performance)}`}>
                      {result.performance}
                    </span>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Score:</span>
                      <span className="font-bold text-lg text-indigo-600">{result.score}%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Correct:</span>
                      <span className="text-green-600 font-semibold">{result.correct}/{result.totalQuestions}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Wrong:</span>
                      <span className="text-red-600 font-semibold">{result.wrong}/{result.totalQuestions}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                      <div
                        className="bg-gradient-to-r from-indigo-400 to-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${result.score}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(result.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Results
