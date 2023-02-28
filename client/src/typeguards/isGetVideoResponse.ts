export function isGetVideoResponse(response: GetVideoResponse.Response | GetVideoResponse.Error | undefined): response is GetVideoResponse.Response {
	if(typeof response === 'undefined') return false;
	return 'count' in response ? true : false;
}
