# Ontology
In this document we are going to describe all the concepts in the use case json-file.

| concept | description | unique | required | allowed to change in city spec | ... 

`id`  : a unique identifier describing the general use case. Preferably describing
externalReference : a url to the source of the use case

## functional items
`story` : user story in the form 'As a ... I would like to ... in order to ... '

`benefits`: list of benifits, in the from a) who is the beneficiary and b) what are the advantages

`problemsSolved` : list of solved problems, again in the same format as benefits

## technical items
`standards` : list of applicable standards. Details can be found in the folder 'standards'. This can be filtered in the city specification.

`authentication` : a list of authentication methods. To be filtered in the city specification. An empty list does imply everything is allowed.

`transport` : a list of transport protocols to transfer data. An empty list again implies everything is allowed.

`storage` : a list of storage requirements, like period or encryption at rest. Empty means everything is allowed. Building blocks allowed in this list are from 'storage-policies' (encryption, max period of storage) and from 'aggregation'. The last one indicates how the city is going to store this information.

`security` : a list of required security standards, like ISO. 

## contractual items
termsAndConditions : a list of terms and conditions. Details can be found in the folder 'terms-and-conditions'

contract : list of contracts. Details in the folder 'contract'. This list cannot be modified within a use case

sharing: the list of sharing policies. More details in the folder 'sharing-policies'


    

    "combinations": [],
    "tags"

{
    "id": "availability",
    "externalReference": "https://airtable.com/shrPf4QvORkjZmHIs/tblzFfU6fxQm5Sdhm/viwsiyw4MNx5CHmFI/recxqdTNFnleDcUHG", 
    "story": {  
        "asA": "city",
        "iWouldLikeTo": "get insight in availability of mobility services",
        "inOrderTo": "serve our citizens by redistributing mobility services"
    },
    "benefits": [ 
        { "to": "cities", 
          "items": [ "The citizens do have a higher availability of mobility assets" ]
    } ],
    "problemsSolved":  [
      { "to": "cities", 
        "items": [ "Shortage by mispositioning of mobility assets" ]
    } ],

    "standards": ["GBFS-2.0-free-bike-status", "GBFS-2.1-free-bike-status", 
      "TOMP-1.2.2-available-assets", "TOMP-1.3.0-available-assets"
    ],

    "termsAndConditions": ["BIO"],
    "contract": ["DPA"],
    "sharing": ["share-with-public-parties"],
    "legalRequirement": ["GDPR-compliancy"],

    "authentication": [],
    "transport": [],
    "storage": [],
    "security": ["iso-27001.json"], 

    "combinations": [],
    "tags": ["public-space:curbstones", "distribution:availability", "mode:bike", "mode:car", "mode:shared-car"]
  }
  