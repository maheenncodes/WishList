import React, {useState}from 'react';
import "./App.css";


export function App(){
  return (
    <div className='app'>
      <div className='head'>
           WishList
      </div>
      
         <WishList/>
    </div>
       
        
       
   
  )
}


export function WishList(){



  const [wish, setWish] = useState("");
  const [list , setList] = useState([]);
   
    

    const handleEnterPress=(e)=>{
        if(e.keyCode===13){
           addWish();
        }
    }

    const handleOnChange=(e)=>{
        setWish(e.target.value);
        
    }

    function removeWish(i){

      const updatedList =list.filter((element, id)=>{
          return i!==id;
      })

      setList(updatedList)

  }
  function moveItemToTop(i)
  {
      const updatedList = [...list];
      const move = updatedList.splice(i, 1)[0];
      updatedList.unshift(move)
      
      setList(updatedList)
  }
  function UpdatePriority(i)
  {
    const dropdownId = `priority2-${i}`; // generate the id of the dropdown element
    const priority21 = document.querySelector(`#${dropdownId}`); // select the dropdown element using its id
   
    var selectedText =  priority21.options[ priority21.selectedIndex].text;
      const updatedList = [...list];
      
      updatedList[i].priority = selectedText;
      setList(updatedList);
  }
    
    const addWish=async(e)=>{

      
      e.preventDefault();
      var prior = document.getElementById("priority");
      var selectedText = prior.options[prior.selectedIndex].text;
      const myDiv = document.getElementById('error');
      
        
        if (wish ) {
            const newWish = { name: wish, priority: selectedText };
        
            setList((list)=>{
              
                const updatedList =[...list, newWish]
                console.log(updatedList.key)
                setWish('')
                myDiv.textContent = '';
                return updatedList
            })
        }
        else{
          
          myDiv.textContent = 'Enter a Wish!';
        }

    }


      
    
    

  return(
    <>
    
    <div className='card'>

      <form className="form">
          <input 
          type='text'
          className="wish" 
          placeholder='Enter Wish'
          onChange={handleOnChange}
          onKeyDown={handleEnterPress}
          value={wish}/>

          <label>Priority:</label>
          <select name="priority" id="priority" className="dropdown"  >
            <option value="high" >High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            </select>
        <button className="add-btn" onClick={addWish}>ADD</button>
          
          
      </form>
   
      <p className="error" id="error"></p>
   


    <ul className='list'>

      {list!==[] && list.map((data, i)=>{
        const priority2 = `priority2-${i}`;
        return(
            <>
            <div key={i} className='card2' >
                <div className='card2-top'>
                  <div className='top-left'>
                    {data.name} 
                  </div>
                  <div className='top-right'>
                    Priority: 
                    {data.priority}
                  </div>
                </div>

                <div className='card2-bottom'>
                    <button  className="rmv-btn"onClick={()=>removeWish(i)}>remove</button>
                    <button className="mv-btn" onClick={()=>moveItemToTop(i)}>Move to Top</button>
                    <button className="mv-btn" onClick={()=>UpdatePriority(i)}>Update Priority</button>

                    <select id={priority2} className="dropdown2" name="priority2"  >
                      <option value="high" >High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                </div>
                
            </div>
            </>
          )
        })
}

</ul>
</div>
    
    
    
     

    
    
    </>
    
  )
}

export default App
