import { gql } from "@apollo/client";



export const GET_WEATHER_QUERY = gql`
    query getCityByName($name: String!){
        getCityByName(name: $name) {
            name
            weather {
                summary {
                    description
                }
                timestamp
                wind {
                    speed
                }
                clouds {
                    humidity
                }
                temperature {
                    actual
                    max
                    min
                }
            }
        }
    }
`;
