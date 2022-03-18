# OD Matrix specification

## Standardization

When transferring data related to movements, this standard can be used to specify the data. The specification is simple and normally easy to generate. The ODM set consists out of 3 parts:
a) Description file
b) Geography specification
c) The OD values

## Description file  

The description file is a JSON file with an explanation:  

```json
{   
   "purpose": "the purpose for sharing this information",  
   "aggregation_function": "the unit of the values, like count, max, min, avg, mean,   
                                                               percentile85, etc.",  
   "unit_description": "the description what the values mean (like `number of trips`, `average   
                                                    duration`). This must be repeated in the OD-values-file",  
   "geography_id" : "the field in the geography specification that identifies the geography",  
   "aggregation_period": { "start": "start time in RFC 3339, section 5.6 (= ISO 8601) )",  
                           "end": "end time in RFC 3339, section 5.6 (= ISO 8601))" },  
   "aggregation_bucket": "aggregation level, like quarterly, hourly, daily, etc.",  
   "generation_date": "time in RFC 3339, section 5.6 (= ISO 8601))"  
}  
```

The file ends with ".odd" (= Origin Destination Description ).  

## Geography specification

For this part ESRI shapefiles (<https://www.esri.com/content/dam/esrisites/sitecore-archive/Files/Pdfs/library/whitepapers/pdfs/shapefile.pdf>) can be used or a GeoJSON file (<https://geojson.org/>). In the files there must be a property as named in the description file and a valid geometry. The projection to use is WGS84.  

ESRI files should comply with the specification, but the name of the files must be the same as the description file (.shp, .shx, .dbf).  

If Geojson is used, the extension of the file must be ".geojson".  

## OD Values

The actual data can be stored in a semicolon separated csv file in this format:  

- Cell 1,1: must be equal to "unit_description" in the description file
- Cell 1,2 " 1,n: the values of the ids (see "geography_id") in the geography specification
- Cell 2,1.. n,1: the values of the ids (see "geography_id") in the geography specification
- Other cells: the values of the relation, where the it must be read as follows:  the geography identified by the first cell in the row must be considered as "Origin" and the value in the header of that cell must be considered as the "Destination".  
The file must have the extension ".odv" (= Origin Destination Values).  

## Example

### Example_odmatrix.odd

```json
{   
   "purpose": "Get insight in movements between two places",  
   "unit": "count",  
   "unit_description": "number of trips",  
   "geography_id" : "id",  
   "aggregation_period": { "start": "2017-06-01T00:00:00.000",  
                           "end": "2017-07-01T00:00:00.000" },  
   "generation_date": "2017-07-01T03:00:00.000Z"  
}  
```

### Example_odmatrix.geojson  

```json
{ "type": "FeatureCollection",  
  "features": [  
  { "type": "Feature",  
    "geometry": { "type": "Polygon", "coordinates":[[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0],[100.0, 1.0], [100.0, 0.0]]]}, 
    "properties": { "id": "324AC234", "name": "First place" }  
  },  
  { "type": "Feature",  
    "geometry": { "type": "Polygon", "coordinates":[[[200.0, 0.0], [201.0, 0.0], [201.0, 2.0],[200.0, 2.0], [200.0, 0.0]]]}, 
    "properties": { "id": "349AB347", "name": "Second place" }  
  }  
]}  
```

### Example_odmatrix.odv

```csv
number of trips;324AC234;349AB347  
324AC234;2;342  
349AB347;94;9  
```

## Notes

It is not mandatory that every geometry in the "geometry specification" is enlisted in the .odv file.
