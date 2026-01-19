import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

export default function Home({ onCreateClick }) {
    return (<>
        <div className="p-3 mx-4 text-center homeBox">
            <h2 className="text-3xl font-bold text-gray-800" style={{ fontSize: "2.1rem" }}>Welcome to JapMala</h2>
            <p className='mb-4 mantra'><i>“ हर स्पर्श में मंत्र ”</i></p>
            <button type="button" onClick={onCreateClick} className="btn btn-outline-success">Add Counter</button>
        </div>
        <div className='mt-5'>
            <hr className='mb-2' />
            <h4 style={{color:"brown"}}>Mantra's Category</h4>
            <hr className='mt-2' />
            <div className='w-75 mx-4'>
                <ul className="list-group list-group-horizontal-lg mb-2">
                    <Link to={"/gayatrimantra"} style={{ textDecoration: 'none' }}><li className="list-group-item">Gayatri Mantra</li></Link>
                    <Link to={"/mahamritunjayjap"} style={{ textDecoration: 'none' }}><li className="list-group-item">MahamritunjayJaap</li></Link>
                    <Link to={"/hanumanji"} style={{ textDecoration: 'none' }}><li className="list-group-item">Hanuman Ji</li></Link>
                
                    <Link to={"/ganeshji"} style={{ textDecoration: 'none' }}><li className="list-group-item">Ganesh Ji</li></Link>
                    <Link to={"/shivji"} style={{ textDecoration: 'none' }}><li className="list-group-item">Shiv Ji</li></Link>
                    <Link to={"/vishnuji"} style={{ textDecoration: 'none' }}><li className="list-group-item">Vishnu Ji</li></Link>
                </ul>
            </div>
        </div>
    </>
    )
}