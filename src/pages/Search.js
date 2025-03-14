import { useState } from "react";
import Navbar from "../components/Navbar";

const Search = () => {
    const [form, setForm] = useState({
        search: '',
        type: '',
    })

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const search = form.search.trim().toLocaleLowerCase().replaceAll(" ", "_");
        console.log(search, form.type);
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    name={'search'}
                    className="border"
                    value={form.search}
                />
                <select name={'type'} onChange={handleChange} value={form.type}>
                    <option value="">Select a type</option> 
                    <option value={"audiobook"}>Audiobook</option>
                    <option value={"podcast"}>Podcast</option>
                    <option value={"artist"}>Artist</option>
                    <option value={"album"}>Album</option>
                    <option value={"song"}>Song</option>
                </select>
                <button type="submit">Search</button>
            </form>
            <h2>Search</h2>
            <Navbar/>
        </>
    )
}

export default Search;