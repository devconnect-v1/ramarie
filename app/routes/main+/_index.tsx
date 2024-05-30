import { json } from "@remix-run/node"
import { NavLink, useLoaderData } from "@remix-run/react"
import { ChevronLeft, ChefHat, Plus, Heart } from "lucide-react"

import { getRecipeListItems } from "~/utils/recipe.server"

export const loader = async () => {
    const recipeLists = await getRecipeListItems();
    return json({ recipeLists });
};

export default function Index() {
    const recipeData = [
        {
            title : 'Breakfast',
            description : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit hic ab accusamus.',
            cover: 'https://img.delicious.com.au/qDQwn4T2/w1200/del/2015/10/minute-steaks-with-romesco-salad-14828-1.jpg'
        },
        {
            title : 'Breakfast',
            description : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit hic ab accusamus.',
            cover: 'https://img.delicious.com.au/qDQwn4T2/w1200/del/2015/10/minute-steaks-with-romesco-salad-14828-1.jpg'
        },
        {
            title : 'Breakfast',
            description : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit hic ab accusamus.',
            cover: 'https://img.delicious.com.au/qDQwn4T2/w1200/del/2015/10/minute-steaks-with-romesco-salad-14828-1.jpg'
        },
    ]
    const coockingData = useLoaderData<typeof loader>();


    return (
        <div className="w-full overflow-y-auto">
            <header>
                <NavLink className="text-emerald-600" to="#">
                    <ChevronLeft className="inline"></ChevronLeft>
                    <span className="ml-1 my-auto">Home</span>
                </NavLink>
            </header>

            <main className="ml-8 mt-10">
                <div className="w-full">
                    <div className="text-emerald-600 inline">
                        <h1 className="text-2xl inline font-heading">What are we cooking <b>today</b> ?</h1>
                        <button type="button" className="text-sm float-end border border-1 border-emerald-600 rounded-lg py-2 px-5 shadow-inner">
                            <ChefHat className="inline mr-1"></ChefHat> PREPARE
                        </button>
                    </div>
                </div>
                <div className="w-max mt-2 inline-flex">
                    {coockingData.recipeLists.map((cooking, index) => (
                        <div key={index} className="w-4/12 h-60 p-5 m-2 shadow-lg rounded-xl">
                            <img className="w-40 h-40 rounded-full m-auto" src="https://img.delicious.com.au/qDQwn4T2/w1200/del/2015/10/minute-steaks-with-romesco-salad-14828-1.jpg" alt="" />
                            <h1 className="text-black">{cooking.title}</h1>
                            <p className="text-sm text-gray-500">Need X ingredients</p>
                        </div>
                    ))}
                </div>

                {/* ======= */}

                <div className="w-full mt-5">
                    <div className="text-emerald-600 inline w-full">
                        <h1 className="text-2xl inline font-sans">My <b>favourite</b> recipe</h1>
                        <button type="button" className="text-sm float-end border border-1 border-emerald-600 rounded-lg py-2 px-5 shadow-inner">
                            <Plus className="inline mr-1"></Plus> ADD PREFERENCE
                        </button>
                    </div>

                    <div className="w-full rounded-xl shadow-lg text-center block p-3 mt-3 text-gray-600">
                        <NavLink to="#" className="mx-5">Soup</NavLink>
                        <NavLink to="#" className="mx-5 text-blue-950 font-heading">Baby food</NavLink>
                        <NavLink to="#" className="mx-5">Nuts</NavLink>
                    </div>

                    <div className="w-full mt-2 inline-flex">
                        {recipeData.map((recipe, index) => (
                            <div key={index} className="w-3/12 h-80 m-2 shadow-lg rounded-xl bg-cover bg-center bg-[url('https://img.delicious.com.au/qDQwn4T2/w1200/del/2015/10/minute-steaks-with-romesco-salad-14828-1.jpg')]">
                                <div className="bg-black w-full h-full p-5 rounded-xl opacity-60 hover:opacity-70">
                                    <h1 className="text-gray-200 text-sm inline">{recipe.title}</h1>
                                    <Heart className="text-white float-end"></Heart>

                                    <p className="text-white text-md mt-3">{recipe.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}