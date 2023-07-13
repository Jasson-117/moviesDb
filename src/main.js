const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	headers: {
	  'Content-Type': 'application/json;charset=utf-8',
	},
	params: {
	  'api_key': API_KEY,
	  "language": "es-ES"
	},
  });
function likedMovieList(){
	let item = JSON.parse(localStorage.getItem('liked_movies')) 
	let movie
	if(item){movie = item}
	else{movie = {}}
	return movie
  }
function likedMovie(movie){
	let item = likedMovieList()
	console.log(item);
	if(item[movie.id]){
		item[movie.id] = undefined
	}else{
		item[movie.id] = movie
		}
	localStorage.setItem('liked_movies',JSON.stringify(item))
}
async function getTrendingMoviesPreview(){
    const {data} = await api('trending/movie/day');
    const moviee = data.results
	createMovies(moviee,trendingMoviesPreviewList,true)


}
async function getCategoriesPreview(){
const {data} = await api('genre/movie/list');
	console.log(data)
    const categories = await data.genres
	createCategories(categories,categoriesPreviewList)

}
//========================= Utils
const lazyLoader = new IntersectionObserver(entries=>
	entries.forEach(entry=>{
		console.log(entry)
		if(entry.isIntersecting){
		const url = entry.target.getAttribute('data-img')
		entry.target.setAttribute('src',url)
	}}

))

function createMovies(movies,container,{lazyLoad=false,clean=true}={}){
	if(clean){
		container.innerHTML = ''

	}
    movies.forEach(movie => {
	const movieContainer = document.createElement('div');
	movieContainer.classList.add('movie-container');

	
	const movieImg = document.createElement('img');
	movieImg.classList.add('movie-img');
	movieImg.setAttribute('alt',movie.title);
	movieImg.setAttribute(
		lazyLoad ? 'data-img':'src',
		'https://image.tmdb.org/t/p/w300/'+movie.poster_path);
	movieImg.addEventListener('click',()=>{
			location.hash = 'movieDetail=' + movie.id
		}  )
	movieImg.addEventListener('error',()=>{
		movieImg.setAttribute('src','https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.gq.com.mx%2Fphotos%2F63b747efeebbd842171b2986%2Fmaster%2Fw_2560%252Cc_limit%2FRENFIELD.jpg&tbnid=CqHyJEBfj9E2CM&vet=12ahUKEwi_h9jLi_b_AhWDFmIAHXBpBfcQMyhYegUIARC8AQ..i&imgrefurl=https%3A%2F%2Fwww.gq.com.mx%2Fentretenimiento%2Farticulo%2Frenfield-pelicula-de-dracula-de-que-trata-reparto-fecha-de-estreno&docid=f1gYR7ScWE2KzM&w=2560&h=1707&q=imagen%20de%20pelicula&hl=en&ved=2ahUKEwi_h9jLi_b_AhWDFmIAHXBpBfcQMyhYegUIARC8AQ')
	})
	const btnMovie = document.createElement('button')
	btnMovie.classList.add('movie-btn')
	likedMovieList()[movie.id] && btnMovie.classList.add('movie-btn--liked')
	btnMovie.addEventListener('click',()=>{
		btnMovie.classList.toggle('movie-btn--liked')
		likedMovie(movie)
	})

	if(lazyLoad){
		lazyLoader.observe(movieImg);
	}
	

	movieContainer.appendChild(movieImg);
	movieContainer.appendChild(btnMovie);

	container.appendChild(movieContainer);  })
} 

function createCategories(movies,container){
	container.innerHTML = ''
    movies.forEach(category => {
	const categoryContainer = document.createElement('div');
	categoryContainer.classList.add('category-container');

	const categoryTitle = document.createElement('h3');
	categoryTitle.classList.add('category-title');
	categoryTitle.setAttribute('id','id'+category.id);
	categoryTitle.addEventListener('click',()=>{
				location.hash = 'category='+category.id+'-'+category.name
			})
    const categoryText = document.createTextNode(category.name)

	categoryTitle.appendChild(categoryText);
	categoryContainer.appendChild(categoryTitle);
	container.appendChild(categoryContainer);  })  }

//=========================
async function getMoviesByCategory(idk){
    const {data} = await api('discover/movie',{
		params:{
			with_genres:idk
		}
	});
    const moviee = data.results
	maxPage = data.total_pages
	createMovies(moviee,genericSection,true)
}
function getPaginatedgetgetMoviesByCategory(idk){
	return async function (){
		const {scrollHeight,scrollTop,clientHeight } = document.documentElement
		const scrollSButon = (scrollTop + clientHeight) >= (scrollHeight - 255)
		
		const pageIsMax = page < maxPage
	
		if(scrollSButon && pageIsMax){
			page++
			/*	const boton = document.getElementById('butonst');
				boton.remove();*/
				
				const {data} = await api('discover/movie',
				{
					params:{
						with_genres:idk,
						page:page
					}
				}
				);
			
				const moviee = data.results
				createMovies(moviee,genericSection,{lazyLoad:true,clean:false})
		}
	
	}

}


async function getMoviesBySearch(query){
    const {data} = await api('search/movie',{
		params:{
		query		}
	});
    const moviee = data.results
	maxPage = data.total_pages
	console.log(maxPage);
	createMovies(moviee,genericSection,{lazyLoad:true,clean:true})
}
 function getPaginatedgetMoviesBySearch(query){
	return async function (){
	const {scrollHeight,scrollTop,clientHeight } = document.documentElement
	const scrollSButon = (scrollTop + clientHeight) >= (scrollHeight - 255)
	
	const pageIsMax = page < maxPage

	if(scrollSButon && pageIsMax){
		page++
		/*	const boton = document.getElementById('butonst');
			boton.remove();*/
			
			const {data} = await api('search/movie',
			{
				params:{
					query:query,
					page:page
				}
			}
			);
		
			const moviee = data.results
			createMovies(moviee,genericSection,{lazyLoad:true,clean:false})
	}

}}

function getLikedMovie(){
	const item = likedMovieList()
	const itemArray = Object.values(item)

	createMovies(itemArray,likedMoviet,{lazyLoad:true,clean:true})

}


async function getTrendingMovies(){
    const {data} = await api('trending/movie/day');
    const moviee = data.results

	createMovies(moviee,genericSection,true)
	maxPage = data.total_pages
	/*const btnLoader = document.createElement('button')
	btnLoader.innerText = 'cargar mas'
	btnLoader.id = 'butonst'
	btnLoader.addEventListener('click',getPaginatedTrendingMovies)
	genericSection.appendChild(btnLoader)*/
}
async function getPaginatedTrendingMovies(){
	const {scrollHeight,scrollTop,clientHeight } = document.documentElement
	const scrollSButon = (scrollTop + clientHeight) >= (scrollHeight - 255)
	
	const pageIsMax = page < maxPage

	if(scrollSButon && pageIsMax){
		page++
		/*	const boton = document.getElementById('butonst');
			boton.remove();*/
			
			const {data} = await api('trending/movie/day',
			{
				params:{
					page:page
				}
			}
			);
		
			const moviee = data.results
			createMovies(moviee,genericSection,{lazyLoad:true,clean:false})
	}

/*	const btnLoader = document.createElement('button')
	btnLoader.innerText = 'cargar mas'
	btnLoader.id = 'butonst'

	btnLoader.addEventListener('click',getPaginatedTrendingMovies)
	genericSection.appendChild(btnLoader)*/

}
async function getMovieByCategory(id){
	const {data:movie} = await api('movie/' + id);
	const movieImgUrl = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path
	console.log(movieImgUrl)
	arrowBtn.style = `color:white`
	headerSection.style.background= `
	linear-gradient(
		180deg, 
		rgba(0, 0, 0, 0.35) 19.27%, 
		rgba(0, 0, 0, 0) 29.17%
		),
		url(${movieImgUrl})`

	movieDetailTitle.textContent = movie.title
	movieDetailDescription.textContent = movie.overview
	movieDetailScore.textContent = movie.vote_average

	createCategories(movie.genres,movieDetailCategoriesList,{lazyLoad:true,clean:true})
	getCategoryToDetail(id)
}

async function getCategoryToDetail(id){
	const {data} = await api(`movie/${id}/recommendations` );
	const categoryDetail = data.results
	createMovies(categoryDetail,relatedMoviesContainer,{lazyLoad:true,clean:true})
}

