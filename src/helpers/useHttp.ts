import { useEffect, useState } from "react"
import { Http } from "./api"
import { useNavigate } from "react-router-dom"

interface IQuery<T> {
    loading: boolean
    data: T
    error: string
    refetch: () => void
    setError: (error: string) => void
    setData: (value: T) => void
}

export enum METHODS {
    GET, POST, DELETE, PUT, PATCH
}
export const useHttpQuery = <ReturnType>(url: string): IQuery<ReturnType> => {
    const [data, setData] = useState<ReturnType | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const refetch = () => {
        Http
            .get(url)
            .then(response => {
                setData(response.data)
            })
            .catch(err => {
                if (err.status == 403) {
                    return navigate("/")
                }
                setError(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }


    useEffect(() => {
        refetch()
    }, [])

    return {
        loading, error, data: data as ReturnType, refetch, setError, setData
    }

}


type Mutation<T, V = undefined> = [(url: string, method: METHODS, payload?: V) => void, error: string, loading: boolean | null, data: T,]
export const useHttpMutation = <ReturnType, PayloadType = null>(onSuccess: (() => void) | undefined): Mutation<ReturnType, PayloadType> => {
    const [data, setData] = useState<ReturnType | null>(null)
    const [loading, setLoading] = useState<boolean | null>(null)
    const [error, setError] = useState("")

    const make = async (url: string, method: METHODS = METHODS.POST, payload?: PayloadType | undefined) => {

        let invocation = null
        setLoading(true)
        switch (method) {
            case METHODS.DELETE:
                invocation = Http.delete(url)
                break;
            case METHODS.PUT:
                invocation = Http.put(url, payload)
                break;
            case METHODS.PATCH:
                invocation = Http.patch(url, payload)
                break;
            case METHODS.GET:
                invocation = Http.get(url)
                break;
            default:
                invocation = Http.post(url, payload)
                break;
        }

         invocation
            .then(response => {
                setData(response.data)
                setError("")
                onSuccess?.()
            })
            .catch(err => {
                console.log(err)
                setError(err.message + ": " + err.response?.data?.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return [
        make, error, loading, data as ReturnType,
    ]

}