import React, { useCallback } from 'react'

const URL = 'https://fakestoreapi.com/products'

export const useProductCart = () => {
    const [products, setProducts] = React.useState(null)
    const [cart, setCart] = React.useState([])
    const [summary, setSummary] = React.useState({ totalBelanja: 0, totalProduct: 0 })
    const [loading, setLoading] = React.useState(false)

    const getProducts = useCallback(async () => {
        setLoading(true)
        setProducts(null)
        try {
            const body = await fetch(URL, { method: 'GET' })
            const data = await body.json()
            if (data) {
                setProducts(data)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
        }
    }, [])

    React.useEffect(() => {
        getProducts()
    }, [])

    function addToCart(product) {
        let temp = [...cart]
        temp.push(product.id)
        setCart(temp)

        let sumTmp = { ...summary }
        sumTmp.totalBelanja += product.price
        sumTmp.totalProduct += 1
        setSummary({ ...sumTmp })
    }

    function deleteFromCart(product) {
        const index = cart.findIndex(id => id === product.id)
        let temp = [...cart]
        index != -1 && temp.splice(index, 1)
        setCart(temp)

        let sumTmp = { ...summary }
        sumTmp.totalBelanja -= product.price
        sumTmp.totalProduct -= 1
        setSummary({ ...sumTmp })
    }

    return {
        products,
        cart,
        addToCart,
        deleteFromCart,
        summary,
        getProducts,
        loading
    }
}