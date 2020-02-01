/* Given a download payload, writes the blob to the provided filename
 */
export function writeDownload({
  objectUrl = null,
  filename = null,
}) {
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = objectUrl;
  tempLink.setAttribute('download', filename);

  if (document.body) document.body.appendChild(tempLink);
  tempLink.click();
  if (document.body) document.body.removeChild(tempLink);
  window.URL.revokeObjectURL(objectUrl);
}
