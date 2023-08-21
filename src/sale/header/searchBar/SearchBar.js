import React from "react";


export default function SearchBar() {
    return (
        <div>
            <form className="form-bundle" action="/tehran/search">
                <div className="clear"><i className="icon icon-search icon-ml"></i>
                    <input id="search__input" name="q" type="text" autoComplete="off"
                           placeholder="محصول,دسته یا برند مورد نظرتان را جستجو کنید..." className="invisible-input"
                           value=""/>
                        <button className="submit btn-outline-primary">جستجو</button>
                </div>
            </form>
        </div>
);
};