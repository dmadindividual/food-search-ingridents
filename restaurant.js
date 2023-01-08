const searchBtn = document.getElementById('search-btn')
const mealList = document.getElementById('meal')
const mealDetail = document.querySelector('.meal-details-content')
const closeBtn = document.getElementById('close-btn')
const searchInput = document.getElementById('search-input')


searchBtn.addEventListener('click', () => {
  let input = searchInput.value
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`)
    .then((response) => response.json())
    .then((data) => {

      let html = ''
      if (data.meals) {
        data.meals.forEach(meal => {
          html += `
                            <div class="meal-item" data-id ="${meal.idMeal}">
                           <div class="meal-img">
                          <img src="${meal.strMealThumb}" alt="" />
                         </div>
      
                        <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                           <a href="#" class="recipe-btn">Get Recipe</a>
                         </div>
                            </div>
                    `

        })
        mealList.classList.remove('notfound')

      } else {
        html = 'Sorry We Did not find Your Search'
        mealList.classList.add('notfound')
      }

      mealList.innerHTML = html


    })



})

mealList.addEventListener('click', (e) => {
  e.preventDefault()
  if (e.target.classList.contains('recipe-btn')) {
    let mealItem = e.target.parentElement.parentElement
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
      .then((response) => response.json())
      .then((data) => ModalRecipe(data.meals))

  }


})

function ModalRecipe(meal) {
  console.log(meal)

  meal = meal[0]
  let html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="category-name">${meal.strCategory}</p>
    <div class="recipe-instruct">  
      <h3>Instructions:</h3>


      <p>
      ${meal.strInstructions}
   
      </p>
      <div class="recipe-meal-img">
        <img src="$${meal.strMealThumb}" alt="" />
      </div>
      <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
      </div>
    `
  mealDetail.innerHTML = html
  mealDetail.parentElement.classList.add('showRecipe')

}

closeBtn.addEventListener('click', () => {
  mealDetail.parentElement.classList.remove('showRecipe')
})