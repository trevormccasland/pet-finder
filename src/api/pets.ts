export interface Measurement {
    imperial: string
}
export interface Image {
    width: number
    height: number
    url: string
}

export interface Cat {
    id: string
    name: string
    weight: Measurement
    temperament: string
    image: Image | null
}

export interface Dog {
    id: string
    name: string
    height: Measurement
    weight: Measurement
    temperament: string
    image: Image
}


export interface GetPetsResponse {
    data: {cats?: Cat[], dogs?: Dog[]}
}

export const getPets = async (cats: boolean, dogs: boolean): Promise<GetPetsResponse> => {
    const url = 'http://localhost:4000/pets'
    let query
    if (!dogs && !cats) {
        throw Error('Specify dogs, cats, or both')
    }
    if (dogs && cats) {
        query = JSON.stringify({
            query: `
                query getDogsAndCats {
                    dogs {
                        id
                        name
                        height {
                            imperial
                        }
                        weight {
                            imperial
                        }
                        temperament
                        image {
                            width
                            height
                            url
                        }
                    }
                    cats {
                        id
                        name
                        weight {
                            imperial
                        }
                        temperament
                        image {
                            width
                            height
                            url
                        }
                    }
                }
            `,
            variables: {},
        });
    }
    else if (dogs) {
        query = JSON.stringify({
            query: `
                query getDogs {
                    dogs {
                        id
                        name
                        height {
                            imperial
                        }
                        weight {
                            imperial
                        }
                        temperament
                        image {
                            width
                            height
                            url
                        }
                    }
                }
            `,
            variables: {},
        });
    }
    else if (cats) {
        query = JSON.stringify({
            query: `
                query getCats {
                    cats {
                        id
                        name
                        weight {
                            imperial
                        }
                        temperament
                        image {
                            width
                            height
                            url
                        }
                    }
                }
            `,
            variables: {},
        });
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: query
    })
    const data = await response.json()
    return data
}