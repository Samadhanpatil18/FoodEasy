import { useContext, useEffect, useState } from "react"
import { StoreContext } from '../context/StoredContext'
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddItem() {

  const { backendUrl, foodItems, getMenu, setActiveLink, checkAuth } = useContext(StoreContext);
  const [data, setData] = useState({});
  const [discount, setDiscount] = useState(0);
  const [category, setCategory] = useState('Main-course');
  const navigate = useNavigate();

  const initialData = {
    title: '',
    description: '',
    rating: 0,
    price: 0,
    image_url: '',
    quantity: 1,
    category: '',
    availability: true,
    spiciness_level: 'Spicy',
    tags: [],
  }

  useEffect(() => {
    if(!checkAuth()){
      navigate('/');
    }
    else{
      setData(initialData);
      setActiveLink('add');
    }
  },[])

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const val = event.target.value;

    if(name == "tags"){
      setData((prev) => {
        prev.tags.push(val)
        return prev;
      })
    }
    else if(!isNaN(val)){
      setData((prev) => ({...prev, [name] : Number(val)}));
    }
    else{
      setData((prev) => ({...prev, [name] : val}));
    }
  }

  async function addToItems(event) {
    event.preventDefault();
    data.tags.push(category);
    const foodData = {
      ...data,
      food_id : Number(foodItems.length+1),
      discount : {
        is_discounted : discount > 0,
        discount_percentage : discount 
      },
    }

    const response = await axios.post(backendUrl + '/api/food/add', foodData);
    if(response.data.success){
      toast.success(response.data.message);
      getMenu();
    }
    else{
      toast.warning(response.data.message);
    }
  }

  return (
    <div className="additem-container w-full min-h-[70vh] px-2">
      <form onSubmit={addToItems}>
        <h1 className="text-center font-bold text-xl mb-5">Add Item</h1>
        <input type="text" placeholder="Enter Dish Name" name="title" required onChange={onChangeHandler} />
        <input type="url" placeholder="Enter Image URL" name="image_url" required onChange={onChangeHandler} />
        <input type="number" placeholder="Enter Actual Price" name="price" max={10000} min={1} required onChange={onChangeHandler} />
        <input type="text" placeholder="Enter Rating (out of 5)" name="rating" maxLength={3} pattern="^\d+(\.\d+)?$" title="Enter only numbers with an optional decimal point" required onChange={onChangeHandler} />
        <input type="number" placeholder="Enter quantity" name="quantity" min={1} max={100} required onChange={onChangeHandler} />
        <input type="text" placeholder="Enter Description" name="description" required onChange={onChangeHandler} />
        <label htmlFor="dis">Enter Discount percentage (optional)</label>
        <input type="number" placeholder="Enter Discount percentage (optional)" name="discount_percentage" id="dis" max={100} min={0} value={discount} onChange={(e) => setDiscount(e.target.value)}/>
        <div className="flex justify-evenly mb-2">
          <section>
            <label htmlFor="south-indian">South Indian</label>
            <input type="radio" name="category" value="South Indian" id="south-indian" onChange={onChangeHandler} />
          </section>
          <section>
            <label htmlFor="south-indian">North Indian</label>
            <input type="radio" name="category" value="North Indian" id="north-indian" onChange={onChangeHandler} />
          </section>
          <section>
            <label htmlFor="south-indian">Chinese</label>
            <input type="radio" name="category" value="Chinese" id="chinese" onChange={onChangeHandler} />
          </section>
          <section>
            <label htmlFor="south-indian">Italian</label>
            <input type="radio" name="category" value="Italian" id="italian" onChange={onChangeHandler} />
          </section>
        </div>
        <p className="text-center mb-2">Select Tags</p>
        <div className="tags flex justify-evenly flex-wrap mb-3">
          <section>
            <label htmlFor="Breakfast">Breakfast</label>
            <input type="checkbox" name="tags" value="Breakfast" id="Breakfast" onChange={onChangeHandler} />
          </section>
          <section>
            <label htmlFor="Lunch">Lunch</label>
            <input type="checkbox" name="tags" value="Lunch" id="Lunch" onChange={onChangeHandler} />
          </section>
          <section>
            <label htmlFor="Dinner">Dinner</label>
            <input type="checkbox" name="tags" value="Dinner" id="Dinner" onChange={onChangeHandler} />
          </section>
          <section>
            <label htmlFor="Veg">Veg</label>
            <input type="checkbox" name="tags" value="Veg" id="Veg" onChange={onChangeHandler} />
          </section>
          <section>
            <label htmlFor="Non-Veg">Non-Veg</label>
            <input type="checkbox" name="tags" value="Non-Veg" id="Non-Veg" onChange={onChangeHandler} />
          </section>
          <section>
            <label htmlFor="Iconic">Iconic</label>
            <input type="checkbox" name="tags" value="Iconic" id="Iconic" onChange={onChangeHandler} />
          </section>
        </div>
        <div className="flex justify-center mb-5">
          <label htmlFor="spiciness_level" className="me-3">Spiciness Level</label>
          <select name="spiciness_level" id="spiciness_level" required onChange={onChangeHandler}>
            <option value="Spicy">Spicy</option>
            <option value="Medium">Medium</option>
            <option value="Mild">Mild</option>
            <option value="None">None</option>
          </select>
        </div>
        <div className="flex justify-center mb-5">
          <label htmlFor="tag" className="me-3">Select Category</label>
          <select name="tags" id="tag" defaultValue={category} required onChange={(e) => setCategory(e.target.value)}>
            <option value="Main-course">Main Course</option>
            <option value="Light-Meals">Light Meals</option>
            <option value="Side-Dish">Side Dish</option>
            <option value="Starter">Starter</option>
            <option value="Snack">Snack</option>
            <option value="Drink">Drink</option>
          </select>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="py-1 px-10 bg-blue-700 font-bold rounded-md text-white">Add Dish</button>
        </div>
      </form>
    </div>
  )
}

export default AddItem