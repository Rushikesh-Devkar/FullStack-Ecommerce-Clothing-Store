import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="description-nav-box">Description</div>
            <div className="description-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
           <p> An e-commerce website is an online platformthat facilates the buying and sellingof product or services 
            over the internet. It serves as a virtual marketplacewhere businesses and individual can showcase their 
            products, interact with customers, and can conduct transactions without the need of physical presence. 
            E-commerce website has gained immensed popularity due to their convinence, accesiblity, and the global
            reach they offer. </p>
            
            <p>E-commerce website typically display products or services along with their detailed description,
                images, prices, and any other available variations(e.g. sizes,colors). Each product usually has
                its own dedicated page with relevant information. 
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox