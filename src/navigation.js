let maxPage
let page = 1
let infiniteScroll
searchFormBtn.addEventListener('click', () => {
    location.hash = "#search=" +   searchFormInput.value    ;
  });
  
  trendingBtn.addEventListener('click', () => {
    location.hash = "#trends";
  });
  
  arrowBtn.addEventListener('click', () => {
    location.hash = "#home";
  });
  
window.addEventListener('DOMContentLoaded',navigator,false)
window.addEventListener('hashchange',navigator,false)
window.addEventListener('scroll',infiniteScroll,{passive:false})


function navigator(){
  if(infiniteScroll){
    window.removeEventListener('scroll',infiniteScroll,{passive:false})
    infiniteScroll = undefined
  }
    console.log({location});

    if(location.hash.startsWith('#trends')){
        trendsPage()
    }else if(location.hash.startsWith('#search')){
        searchpage()
        }else if(location.hash.startsWith('#movieDetail')){
            movieDetail()
            }else if(location.hash.startsWith('#category')){
                category()
                }else{
                    home()
                }
    document.body.scrollTop = 0
  if(infiniteScroll){
    window.addEventListener('scroll',infiniteScroll,{passive:false})
  }
}
function home(){
    console.log("Home!!")

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.add('inactive');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  likedSeccion.classList.remove('inactive');

  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');

  getTrendingMoviesPreview()
  getCategoriesPreview()
  getLikedMovie()
}
function category(){
    console.log("Categories!!")
  
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
    likedSeccion.classList.add('inactive');

  
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    const [_h,categoryData] = location.hash.split('=')
    const [categoryDataNum,categoryname] = categoryData.split('-')
    headerCategoryTitle.innerHTML = categoryname

    getMoviesByCategory(categoryDataNum)
    infiniteScroll = getPaginatedgetgetMoviesByCategory(categoryDataNum)

}
function movieDetail(){
    console.log("Movie!!")
    headerSection.classList.add('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
    likedSeccion.classList.add('inactive');

  
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    const [_h,data] = location.hash.split('=')
    getMovieByCategory(data)

}
function searchpage(){
    console.log("Search!!");

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');
    likedSeccion.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
        const [_h,query] = location.hash.split('=')
        getMoviesBySearch(query)
        infiniteScroll = getPaginatedgetMoviesBySearch(query)



}
function trendsPage() {
    console.log("TRENDS!!");
  
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
    likedSeccion.classList.add('inactive');

  
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    headerCategoryTitle.innerHTML = 'Tendencias'

    getTrendingMovies()
    infiniteScroll = getPaginatedTrendingMovies
  }