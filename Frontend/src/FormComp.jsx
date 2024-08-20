import React, { useState } from "react";
import axios from "axios";
import './App.css'


export const FormComp = () => {
    const [urls, setUrls] = useState(['', '', '']); 
    const [metaData, setMetaData] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (index, value) => {
        const newUrls = [...urls];
        newUrls[index] = value;
        setUrls(newUrls);
    };

    const addInputField = () => {
        setUrls([...urls, '']);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const filteredUrls = urls.map(url => url.trim()).filter(url => url !== '');
        
        if (filteredUrls.length < 3) {
            setError('Please provide at least 3 URLs.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('https://urls-fetch-metadata-8ac0d9e301f8.herokuapp.com/api/fetch-metadata', { urls: filteredUrls });
            setMetaData(response.data);
        } catch (error) {
            setError('Failed to fetch data. Please try different URLs.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="form-container">
            <h1>URLs, fetch metadata </h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Please provide at least 3 different URLs:
                </label>
                {urls.map((url, index) => (
                    <input 
                        key={index}
                        type="text" 
                        value={url} 
                        onChange={(e) => handleInputChange(index, e.target.value)} 
                        placeholder={`http://www.url ${index + 1}`}
                    />
                ))}
                <button type="button" onClick={addInputField}>
                    Add More URLs
                </button>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Fetching...' : 'Fetch Metadata'}
                </button>
            </form>

            {error && <p className="error">{error}</p>}

            <h2>Results:</h2><br/>
            {metaData.length > 0 && (
                <div className="results">
                    {metaData.map((data, index) => (
                        <div key={index} className="result-card">
                            <h3>{data.title || 'No Title'}</h3>
                            <p>{data.description || 'No Description'}</p>
                            {data.image && <img src={data.image} alt="Metadata" />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
