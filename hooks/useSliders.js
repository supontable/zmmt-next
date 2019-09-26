import { useContext, useState, useEffect } from 'react'
import { SlidersContext } from '../SlidersContext'

const useSliders = (
    scope = {
        amount: {
            min: 3000,
            max: 98000,
            step: 500
        },
        term: {
            min: 5,
            max: 365,
            step: 1
        }
    }) => {
    const [slidersContext, setSlidersContext] = useContext(SlidersContext);
    const [slidersScope, setScope] = useState(scope)
    const habdleChangeScope = scope => {
        setScope({...scope})
    }
    const handleSliderChange = name => (event, value) => {
        if (slidersContext[name] === value) return false
        setSlidersContext(context => ({
            ...context,
            [name]: value ? value : event
        }))
    }
    return [slidersContext, slidersScope, handleSliderChange, habdleChangeScope]
}

export default useSliders