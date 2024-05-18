import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRestaurant } from '../../store'
import { request } from '../../services/requestService'

export const RestaurantSettings: React.FC = React.memo(() => {
  const dispatch = useDispatch()
  const restaurantData = useSelector(selectRestaurant).data

  const [formData, setFormData] = useState(
    restaurantData || {
      id: 0,
      name: '',
      phone: '',
      email: '',
      address: {
        id: 0,
        city: '',
        district: '',
        address: '',
        nHood: '',
        street: '',
        no: '',
      },
      imageUrl: null,
      hasDelivery: false,
      campus: 'DEFAULT_CAMPUS',
    },
  )

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await request.put('/restaurant', formData) // Replace '/api/restaurant' with your actual API endpoint
      if (response.data.success) {
        // Dispatch an action to update the restaurant data in your Redux store
        dispatch({ type: 'UPDATE_RESTAURANT', payload: formData })
        console.log('Restaurant updated successfully')
      } else {
        console.error('Error updating restaurant:', response.data.message)
      }
    } catch (error) {
      console.error('Error updating restaurant:', error)
    }
  }

  return (
    <div>
      <h1>Restaurant Settings</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData?.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData?.phone}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData?.address?.address}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Has Delivery:
          <input
            type="checkbox"
            name="hasDelivery"
            checked={formData?.hasDelivery}
            onChange={handleCheckboxChange}
          />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  )
})
