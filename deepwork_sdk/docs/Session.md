# Session


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | 
**goal** | **str** |  | [optional] 
**scheduled_duration** | **int** |  | 
**id** | **int** |  | 
**start_time** | **datetime** |  | [optional] 
**end_time** | **datetime** |  | [optional] 
**status** | **str** |  | 
**interruption_count** | **int** |  | 
**created_at** | **datetime** |  | 
**interruptions** | [**List[Interruption]**](Interruption.md) |  | [optional] [default to []]

## Example

```python
from openapi_client.models.session import Session

# TODO update the JSON string below
json = "{}"
# create an instance of Session from a JSON string
session_instance = Session.from_json(json)
# print the JSON string representation of the object
print(Session.to_json())

# convert the object into a dict
session_dict = session_instance.to_dict()
# create an instance of Session from a dict
session_from_dict = Session.from_dict(session_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


