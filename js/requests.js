    
    const baseUrl = 'https://localhost:7192/api'; // Only to test    
    
    export async function GetAllCountries(){
        const response = await fetch(`${baseUrl}/country/`)
        return response.json();
    }

    export async function GetCountryById(id){
        const response = await fetch(`${baseUrl}/Country/id/${id}`)
        return response.json();
    }

    export async function PostCountry(){
        const response = await fetch(`${baseUrl}/country/id/${id}`)
        return response.json();
    }