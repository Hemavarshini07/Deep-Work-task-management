@echo off
echo Generating Python SDK...
npx @openapitools/openapi-generator-cli generate -i openapi.json -g python -o deepwork_sdk --skip-validate-spec
echo SDK generation complete.
