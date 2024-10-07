import React from 'react';

export default function Pagination({ links, onPageClick }) {
  if (!links){ 
    return null;
  }

  return (
    <div className="mt-8">
      <nav className="flex justify-center items-center space-x-2">
        {links.map((link, index) => (
          <button
            key={index}
            onClick={() => onPageClick(link.url)}
            disabled={!link.url}
            className={`px-3 py-2 rounded ${
              link.active
                ? 'bg-blue-600 text-white'
                : link.url
                ? 'bg-white text-blue-600 hover:bg-blue-50'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            } border ${link.active ? 'border-blue-600' : 'border-gray-300'}`}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ))}
      </nav>
      {links[0].url && (
        <div className="mt-4 text-center text-gray-600">
          Showing {links[0].from} to {links[0].to} of {links[0].total} results
        </div>
      )}
    </div>
  );
}