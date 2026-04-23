# openapi_client.SessionsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**complete_session_sessions_session_id_complete_patch**](SessionsApi.md#complete_session_sessions_session_id_complete_patch) | **PATCH** /sessions/{session_id}/complete | Complete Session
[**create_session_sessions_post**](SessionsApi.md#create_session_sessions_post) | **POST** /sessions/ | Create Session
[**get_sessions_sessions_history_get**](SessionsApi.md#get_sessions_sessions_history_get) | **GET** /sessions/history | Get Sessions
[**pause_session_sessions_session_id_pause_patch**](SessionsApi.md#pause_session_sessions_session_id_pause_patch) | **PATCH** /sessions/{session_id}/pause | Pause Session
[**resume_session_sessions_session_id_resume_patch**](SessionsApi.md#resume_session_sessions_session_id_resume_patch) | **PATCH** /sessions/{session_id}/resume | Resume Session
[**start_session_sessions_session_id_start_patch**](SessionsApi.md#start_session_sessions_session_id_start_patch) | **PATCH** /sessions/{session_id}/start | Start Session


# **complete_session_sessions_session_id_complete_patch**
> Session complete_session_sessions_session_id_complete_patch(session_id)

Complete Session

### Example


```python
import openapi_client
from openapi_client.models.session import Session
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.SessionsApi(api_client)
    session_id = 56 # int | 

    try:
        # Complete Session
        api_response = api_instance.complete_session_sessions_session_id_complete_patch(session_id)
        print("The response of SessionsApi->complete_session_sessions_session_id_complete_patch:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SessionsApi->complete_session_sessions_session_id_complete_patch: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **session_id** | **int**|  | 

### Return type

[**Session**](Session.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **create_session_sessions_post**
> Session create_session_sessions_post(session_create)

Create Session

### Example


```python
import openapi_client
from openapi_client.models.session import Session
from openapi_client.models.session_create import SessionCreate
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.SessionsApi(api_client)
    session_create = openapi_client.SessionCreate() # SessionCreate | 

    try:
        # Create Session
        api_response = api_instance.create_session_sessions_post(session_create)
        print("The response of SessionsApi->create_session_sessions_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SessionsApi->create_session_sessions_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **session_create** | [**SessionCreate**](SessionCreate.md)|  | 

### Return type

[**Session**](Session.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_sessions_sessions_history_get**
> List[Session] get_sessions_sessions_history_get()

Get Sessions

### Example


```python
import openapi_client
from openapi_client.models.session import Session
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.SessionsApi(api_client)

    try:
        # Get Sessions
        api_response = api_instance.get_sessions_sessions_history_get()
        print("The response of SessionsApi->get_sessions_sessions_history_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SessionsApi->get_sessions_sessions_history_get: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**List[Session]**](Session.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **pause_session_sessions_session_id_pause_patch**
> Session pause_session_sessions_session_id_pause_patch(session_id, interruption_create)

Pause Session

### Example


```python
import openapi_client
from openapi_client.models.interruption_create import InterruptionCreate
from openapi_client.models.session import Session
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.SessionsApi(api_client)
    session_id = 56 # int | 
    interruption_create = openapi_client.InterruptionCreate() # InterruptionCreate | 

    try:
        # Pause Session
        api_response = api_instance.pause_session_sessions_session_id_pause_patch(session_id, interruption_create)
        print("The response of SessionsApi->pause_session_sessions_session_id_pause_patch:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SessionsApi->pause_session_sessions_session_id_pause_patch: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **session_id** | **int**|  | 
 **interruption_create** | [**InterruptionCreate**](InterruptionCreate.md)|  | 

### Return type

[**Session**](Session.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **resume_session_sessions_session_id_resume_patch**
> Session resume_session_sessions_session_id_resume_patch(session_id)

Resume Session

### Example


```python
import openapi_client
from openapi_client.models.session import Session
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.SessionsApi(api_client)
    session_id = 56 # int | 

    try:
        # Resume Session
        api_response = api_instance.resume_session_sessions_session_id_resume_patch(session_id)
        print("The response of SessionsApi->resume_session_sessions_session_id_resume_patch:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SessionsApi->resume_session_sessions_session_id_resume_patch: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **session_id** | **int**|  | 

### Return type

[**Session**](Session.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **start_session_sessions_session_id_start_patch**
> Session start_session_sessions_session_id_start_patch(session_id)

Start Session

### Example


```python
import openapi_client
from openapi_client.models.session import Session
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.SessionsApi(api_client)
    session_id = 56 # int | 

    try:
        # Start Session
        api_response = api_instance.start_session_sessions_session_id_start_patch(session_id)
        print("The response of SessionsApi->start_session_sessions_session_id_start_patch:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SessionsApi->start_session_sessions_session_id_start_patch: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **session_id** | **int**|  | 

### Return type

[**Session**](Session.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

