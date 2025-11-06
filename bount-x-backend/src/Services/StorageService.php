<?php

namespace App\Services;

use Exception;

class StorageService
{
    private $uploadDirectory;

    public function __construct($uploadDirectory = 'uploads/')
    {
        $this->uploadDirectory = rtrim($uploadDirectory, '/') . '/';
        if (!is_dir($this->uploadDirectory)) {
            mkdir($this->uploadDirectory, 0755, true);
        }
    }

    public function uploadFile($file)
    {
        if ($file['error'] !== UPLOAD_ERR_OK) {
            throw new Exception('File upload error: ' . $file['error']);
        }

        $targetPath = $this->uploadDirectory . basename($file['name']);
        if (move_uploaded_file($file['tmp_name'], $targetPath)) {
            return $targetPath;
        } else {
            throw new Exception('Failed to move uploaded file.');
        }
    }

    public function deleteFile($filename)
    {
        $filePath = $this->uploadDirectory . $filename;
        if (file_exists($filePath)) {
            unlink($filePath);
            return true;
        }
        return false;
    }

    public function getFileUrl($filename)
    {
        return $this->uploadDirectory . $filename;
    }
}