export default (
	author: GetVideoResponse.GroupAuthor | GetVideoResponse.ProfileAuthor,
): author is GetVideoResponse.GroupAuthor => {
	return 'name' in author ? true : false;
};
