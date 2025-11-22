import './App.css'
import {useEffect, useState} from "react";
interface Country {
    id: number;
    name: string;
    code: string;
    slug: string;
    image: string | null;
}

function App() {
    const [countries, setCountries] = useState<Country[]>([]);
    useEffect(()=>{
        const url = "http://localhost:5149/api/Coutries";
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setCountries(data);
            console.log(data)
        });
        console.log("App mounted");
    }, []);

    return (
        <>
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                <tr>
                                    <th scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                        Назва
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                        Код
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                        Slug
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                        Зображення
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                                        Action
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {countries.map(country => (
                                    <tr key={country.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{country.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{country.code}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{country.slug}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            <img
                                                src={`http://localhost:5149/assets/images/${country.image ?? "default.png"}`}
                                                alt={country.name}
                                                className="h-10 w-auto"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                            <button type="button"
                                                    className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
