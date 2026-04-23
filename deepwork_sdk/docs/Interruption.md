# Interruption


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**reason** | **str** |  | 
**id** | **int** |  | 
**session_id** | **int** |  | 
**pause_time** | **datetime** |  | 

## Example

```python
from openapi_client.models.interruption import Interruption

# TODO update the JSON string below
json = "{}"
# create an instance of Interruption from a JSON string
interruption_instance = Interruption.from_json(json)
# print the JSON string representation of the object
print(Interruption.to_json())

# convert the object into a dict
interruption_dict = interruption_instance.to_dict()
# create an instance of Interruption from a dict
interruption_from_dict = Interruption.from_dict(interruption_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


