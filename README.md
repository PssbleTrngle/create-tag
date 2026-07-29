# PssbleTrngle/create-tag

```yaml
- uses: PssbleTrngle/create-tag@v1
  id: action
  with:
    from: build/release.json
    token: ${{ secrets.GITHUB_TOKEN }}

- run: echo ${{ steps.action.outputs.tag }}
```

## Inputs

| key   | description                                      | Default | Required |
| ----- | ------------------------------------------------ | ------- | -------- |
| token | the github token to be used                      | `null`  | yes      |
| from  | a release.json file in the shape described below | `null`  | no       |
| tag   | a string tag name to create                      | `null`  | no       |

You must set either `from` or `tag`

## Outputs

| key | description          | Type   |
| --- | -------------------- | ------ |
| tag | the created tag name | string |
