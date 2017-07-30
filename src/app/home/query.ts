import gql from 'graphql-tag';

export const getCardAndScansOfUserConnected = gql`
  {
    user{
      id
      card{
        id
        scans{
          id
          value
        }
      }
    }
  }
`;

export const getCardAndScansAndPlaceOfUserConnected = gql`
  {
    user{
      id
      card{
        id
        scans(orderBy:createdAt_DESC){
          id
          value
          createdAt
          place{
            name
          }
        }
      }
    }
  }
`;

export const getUserProfil = gql`
  {
    user{
      id
      age
      postalCode
      gender
      interest
    }
  }
`;

export const updateUserMutation = gql`
  mutation updateUser ($id:ID!,$age:Int!,$postalCode:Int!,$gender:USER_GENDER!,$interest:String){
    updateUser(id:$id,age:$age,postalCode:$postalCode,gender:$gender,interest:$interest){
      id,
      age,
      postalCode,
      gender,
      interest
    }
  }
`;
export const getAllPlaces = gql`
  {
    allPlaces{
      id
      name
      lat,
      lon
      isShop
    }
  }
`;

